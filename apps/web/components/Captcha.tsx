'use client';

import Turnstile from 'react-turnstile';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export function Captcha({ onVerify }: { onVerify: (token: string) => void }) {
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const hcaptchaKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  if (turnstileKey) {
    return <Turnstile sitekey={turnstileKey} onVerify={onVerify} />;
  }
  if (hcaptchaKey) {
    return <HCaptcha sitekey={hcaptchaKey} onVerify={(token) => onVerify(token)} />;
  }
  return null;
}

