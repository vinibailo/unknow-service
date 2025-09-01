import { ToolPage } from "@/components/ToolPage";
import { z } from "zod";

const schema = z.object({ width: z.string().optional(), height: z.string().optional() });

export default function Page() {
  return <ToolPage toolId="img-resize" schema={schema} />;
}
