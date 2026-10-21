// Funzione serverless Vercel: il link del bonus esce SOLO se il lead e' stato scritto sul foglio.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};

  // Honeypot: i bot compilano il campo nascosto. Risposta finta, nessun link.
  if (b.website) return res.status(200).json({ ok: false, error: 'rejected' });

  const nome = String(b.nome || '').trim().slice(0, 80);
  const cognome = String(b.cognome || '').trim().slice(0, 80);
  const email = String(b.email || '').trim().slice(0, 160);
  if (!nome || !cognome || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }

  const { GOOGLE_SCRIPT_URL, APPS_SCRIPT_SECRET, BONUS_DRIVE_URL, BONUS_URL, BOOK_TITLE } = process.env;
  const bonusUrl = BONUS_DRIVE_URL || BONUS_URL;
  if (!GOOGLE_SCRIPT_URL || !APPS_SCRIPT_SECRET || !bonusUrl) {
    return res.status(500).json({ ok: false, error: 'config' });
  }

  try {
    const r = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        nome, cognome, email,
        timestamp: new Date().toISOString(),
        libro: BOOK_TITLE || '',
        secret: APPS_SCRIPT_SECRET,
      }),
      redirect: 'follow',
    });
    const j = await r.json();
    if (!j || j.ok !== true) return res.status(502).json({ ok: false, error: 'upstream' });
    return res.status(200).json({ ok: true, bonusUrl });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'upstream' });
  }
};
