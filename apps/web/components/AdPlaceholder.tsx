'use client';

import { useSession } from 'next-auth/react';

export function AdPlaceholder() {
  const { data: session } = useSession();
  if (session && session.user.plan !== 'FREE') {
    return null;
  }
  return (
    <div className="my-6 flex justify-center">
      <div className="h-32 w-full max-w-5xl bg-zinc-200 text-sm text-zinc-600 flex items-center justify-center">
        Ad Placeholder
      </div>
    </div>
  );
}

