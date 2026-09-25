/* global process */
// Netlify Function — relays the portfolio contact form through Brevo's
// transactional email API. The API key stays server-side.
//
// Required env vars (Netlify → Site settings → Environment variables):
//   BREVO_API_KEY       Brevo API v3 key (starts with "xkeysib-")
//   BREVO_SENDER_EMAIL  a VERIFIED sender in your Brevo account
// Optional:
//   BREVO_SENDER_NAME   display name (default: "Portfolio Contact Form")
//   CONTACT_TO_EMAIL    delivery inbox (default: Johnrey's email)

const TO_DEFAULT = 'mansilungan.johnrey.dll@gmail.com';
const TIMEOUT_MS = 9000; // just under Netlify's 10s function limit

const reply = (statusCode, body) => ({
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

// POST to Brevo using global fetch (Node 18+) with an explicit timeout
async function brevoPost(apiKey, payload) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'api-key': apiKey,
                'content-type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const text = await res.text();
        return { status: res.status, body: text };
    } finally {
        clearTimeout(timer);
    }
}

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return reply(405, { error: 'Method not allowed.' });
    }

    let data;
    try {
        data = JSON.parse(event.body || '{}');
    } catch {
        return reply(400, { error: 'Invalid request.' });
    }

    const name    = String(data.name    || '').trim();
    const email   = String(data.email   || '').trim();
    const message = String(data.message || '').trim();
    const company = String(data.company || '').trim(); // honeypot

    if (company) return reply(200, { ok: true });

    if (!name || name.length > 100)
        return reply(400, { error: 'Please enter your name.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return reply(400, { error: 'Please enter a valid email address.' });
    if (message.length < 10 || message.length > 5000)
        return reply(400, { error: 'Message must be between 10 and 5,000 characters.' });

    const apiKey      = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName  = process.env.BREVO_SENDER_NAME  || 'Portfolio Contact Form';
    const toEmail     = process.env.CONTACT_TO_EMAIL   || TO_DEFAULT;

    if (!apiKey || !senderEmail) {
        console.error('Missing BREVO_API_KEY or BREVO_SENDER_EMAIL');
        return reply(500, { error: 'Email service is not configured yet.' });
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
        const result = await brevoPost(apiKey, payload);

        if (result.status < 200 || result.status >= 300) {
            console.error('Brevo API error', result.status, result.body);
            return reply(502, {
                error: 'Could not send your message right now. Please email me directly.',
            });
        }

        return reply(200, { ok: true });
    } catch (err) {
        if (err.name === 'AbortError') {
            console.error('Brevo request timed out after', TIMEOUT_MS, 'ms');
            return reply(504, { error: 'Email service timed out. Please email me directly.' });
        }
        console.error('send-contact crashed:', err);
        return reply(500, { error: 'Unexpected error. Please email me directly.' });
    }
};
