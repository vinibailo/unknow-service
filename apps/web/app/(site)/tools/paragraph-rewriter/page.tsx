"use client";

import { ToolPage } from "@/components/ToolPage";
import { z } from "zod";
import { useSession } from "next-auth/react";

const schema = z.object({});

export default function Page() {
  const { data: session } = useSession();
  return <ToolPage toolId="paragraph-rewriter" schema={schema} requireCaptcha={!session} />;
}
