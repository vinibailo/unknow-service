import { ToolWizard } from "@/components/ToolWizard";
import { runTool } from "@/lib/runTool";
import { z } from "zod";

const schema = z.object({ width: z.string().optional(), height: z.string().optional() });

export default function Page() {
  return <ToolWizard schema={schema} onRun={(file, values) => runTool("img-resize", file, values)} />;
}
