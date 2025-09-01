"use client";

import { ToolPage } from "@/components/ToolPage";
import { z } from "zod";
import { useSession } from "next-auth/react";

const schema = z.object({ bitrate: z.string().optional() });

export default function Page() {
  const { data: session } = useSession();
  return <ToolPage toolId="video-compress" schema={schema} requireCaptcha={!session} />;
}
