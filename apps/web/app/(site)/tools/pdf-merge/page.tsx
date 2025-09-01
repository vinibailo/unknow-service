import { ToolWizard } from "@/components/ToolWizard";
import { runTool } from "@/lib/runTool";
import { z } from "zod";

const schema = z.object({});

export default function Page() {
  return <ToolWizard schema={schema} onRun={(file, values) => runTool("pdf-merge", file, values)} />;
}
