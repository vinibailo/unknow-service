import { ToolWizard } from "@/components/ToolWizard";
import { runTool } from "@/lib/runTool";
import { z } from "zod";

const schema = z.object({ bitrate: z.string().optional() });

export default function Page() {
  return <ToolWizard schema={schema} onRun={(file, values) => runTool("video-compress", file, values)} />;
}
