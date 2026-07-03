/* global process */
// Netlify Function — relays the portfolio contact form through Brevo's
// transactional email API. The API key stays server-side; it is never shipped
// to the browser.
//
// Required env vars (Netlify → Site settings → Environment variables):
//   BREVO_API_KEY       Brevo API v3 key (starts with "xkeysib-")
//   BREVO_SENDER_EMAIL  a VERIFIED sender in your Brevo account
// Optional:
//   BREVO_SENDER_NAME   display name for the sender (default: "Portfolio Contact Form")
//   CONTACT_TO_EMAIL    inbox that receives messages (default: Johnrey's email)

const https = require('https');

const TO_DEFAULT = 'mansilungan.johnrey.dll@gmail.com';

const response = (statusCode, body) => ({
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
});

const escapeHtml = (s = '') =>
    String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

// Wraps Node's https.request in a promise so we don't need fetch
const httpsPost = (url, headers, body) =>
    new Promise((resolve, reject) => {
        const { hostname, pathname, search } = new URL(url);
        const bodyStr = JSON.stringify(body);
        const req = https.request(
            {
                hostname,
                path: pathname + (search || ''),
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(bodyStr),
                },
            },
            (res) => {
                let raw = '';
                res.on('data', (chunk) => { raw += chunk; });
                res.on('end', () => resolve({ status: res.statusCode, body: raw }));
            }
        );
        req.on('error', reject);
        req.write(bodyStr);
        req.end();
    });

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return response(405, { error: 'Method not allowed.' });
    }

    let data;
    try {
        data = JSON.parse(event.body || '{}');
    } catch {
        return response(400, { error: 'Invalid request.' });
    }

    const name    = String(data.name    || '').trim();
    const email   = String(data.email   || '').trim();
    const message = String(data.message || '').trim();
    const company = String(data.company || '').trim(); // honeypot

    // Bot trap — real users never fill the hidden company field
    if (company) return response(200, { ok: true });

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || name.length > 100)          return response(400, { error: 'Please enter your name.' });
    if (!emailOk)                            return response(400, { error: 'Please enter a valid email address.' });
    if (message.length < 10 || message.length > 5000) {
        return response(400, { error: 'Message must be between 10 and 5,000 characters.' });
    }

    const apiKey      = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName  = process.env.BREVO_SENDER_NAME  || 'Portfolio Contact Form';
    const toEmail     = process.env.CONTACT_TO_EMAIL   || TO_DEFAULT;

    if (!apiKey || !senderEmail) {
        console.error('Missing BREVO_API_KEY or BREVO_SENDER_EMAIL env vars');
        return response(500, { error: 'Email service is not configured yet.' });
    }

    const safe = {
        name:    escapeHtml(name),
        email:   escapeHtml(email),
        message: escapeHtml(message).replace(/\n/g, '<br>'),
    };

    const payload = {
        sender:      { name: senderName, email: senderEmail },
        to:          [{ email: toEmail, name: 'Johnrey Mansilungan' }],
        replyTo:     { email, name },
        subject:     `New portfolio message from ${name}`,
        htmlContent: `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#141414;line-height:1.6">
  <h2 style="margin:0 0 14px">New message from your portfolio</h2>
  <p style="margin:0 0 6px"><strong>Name:</strong> ${safe.name}</p>
  <p style="margin:0 0 14px"><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
  <p style="margin:0 0 6px"><strong>Message:</strong></p>
  <div style="white-space:pre-wrap;padding:14px 16px;background:#f3f2ef;border-radius:10px">${safe.message}</div>
</div>`,
        textContent: `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
        const result = await httpsPost(
            'https://api.brevo.com/v3/smtp/email',
            { 'api-key': apiKey, accept: 'application/json' },
            payload
        );

        if (result.status < 200 || result.status >= 300) {
            console.error('Brevo API error', result.status, result.body);
            return response(502, {
                error: 'Could not send your message right now. Please email me directly.',
            });
        }

        return response(200, { ok: true });
    } catch (err) {
        console.error('send-contact crashed:', err);
        return response(500, { error: 'Unexpected error. Please email me directly.' });
    }
};
