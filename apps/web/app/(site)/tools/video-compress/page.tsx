import { ToolWizard } from "@/components/ToolWizard";
import { runTool } from "@/lib/runTool";
import { z } from "zod";
import { useSession } from "next-auth/react";

const schema = z.object({ bitrate: z.string().optional() });

export default function Page() {
  const { data: session } = useSession();
  return (
    <ToolWizard
      schema={schema}
      requireCaptcha={!session}
      onRun={(file, values, token) =>
        runTool("video-compress", file, { ...values, captchaToken: token })
      }
    />
  );
}
