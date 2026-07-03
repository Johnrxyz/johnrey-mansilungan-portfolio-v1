/* global process */
// Netlify Function (v2) — relays the portfolio contact form through Brevo's
// transactional email API. The API key stays server-side; it is never shipped
// to the browser.
//
// Required env vars (Netlify → Site settings → Environment variables):
//   BREVO_API_KEY       Brevo API v3 key (starts with "xkeysib-")
//   BREVO_SENDER_EMAIL  a VERIFIED sender in your Brevo account
// Optional:
//   BREVO_SENDER_NAME   display name for the sender (default: "Portfolio Contact Form")
//   CONTACT_TO_EMAIL    inbox that receives messages (default: Johnrey's email)

const TO_DEFAULT = 'mansilungan.johnrey.dll@gmail.com';

const json = (status, body) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'content-type': 'application/json' },
    });

const escapeHtml = (s = '') =>
    s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

export default async (req) => {
    if (req.method !== 'POST') return json(405, { error: 'Method not allowed.' });

    let data;
    try {
        data = await req.json();
    } catch {
        return json(400, { error: 'Invalid request.' });
    }

    const name = (data.name || '').toString().trim();
    const email = (data.email || '').toString().trim();
    const message = (data.message || '').toString().trim();
    const company = (data.company || '').toString().trim(); // honeypot

    // Bot trap: a real user never fills the hidden "company" field. Pretend success.
    if (company) return json(200, { ok: true });

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || name.length > 100) return json(400, { error: 'Please enter your name.' });
    if (!emailOk) return json(400, { error: 'Please enter a valid email address.' });
    if (message.length < 10 || message.length > 5000) {
        return json(400, { error: 'Message must be between 10 and 5000 characters.' });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME || 'Portfolio Contact Form';
    const toEmail = process.env.CONTACT_TO_EMAIL || TO_DEFAULT;

    if (!apiKey || !senderEmail) {
        return json(500, { error: 'Email service is not configured yet.' });
    }

    const safe = {
        name: escapeHtml(name),
        email: escapeHtml(email),
        message: escapeHtml(message).replace(/\n/g, '<br>'),
    };

    const payload = {
        sender: { name: senderName, email: senderEmail },
        to: [{ email: toEmail, name: 'Johnrey Mansilungan' }],
        replyTo: { email, name },
        subject: `New portfolio message from ${name}`,
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
        const resp = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'content-type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!resp.ok) {
            const detail = await resp.text().catch(() => '');
            console.error('Brevo error', resp.status, detail);
            return json(502, {
                error: 'Could not send your message right now. Please email me directly.',
            });
        }

        return json(200, { ok: true });
    } catch (err) {
        console.error('send-contact failed', err);
        return json(500, { error: 'Unexpected error. Please email me directly.' });
    }
};
