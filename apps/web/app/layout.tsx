import type { ReactNode } from "react";
import "./globals.css";
import { auth } from "@/lib/auth";
import { Providers } from "./providers";
import { UpgradeStrip } from "@/components/UpgradeStrip";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        {session?.user.plan === "FREE" && <UpgradeStrip />}
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
