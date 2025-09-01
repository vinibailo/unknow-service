export async function verifyCaptcha(token: string | undefined) {
  if (!token) return false;
  const secret = process.env.TURNSTILE_SECRET_KEY || process.env.HCAPTCHA_SECRET_KEY;
  if (!secret) return false;
  const body = new URLSearchParams({ secret, response: token });
  const url = process.env.TURNSTILE_SECRET_KEY
    ? 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
    : 'https://hcaptcha.com/siteverify';
  const res = await fetch(url, { method: 'POST', body });
  const data = await res.json();
  return !!data.success;
}

