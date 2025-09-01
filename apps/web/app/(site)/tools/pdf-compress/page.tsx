import { ToolPage } from "@/components/ToolPage";
import { z } from "zod";

const schema = z.object({ level: z.string().optional() });

export default function Page() {
  return <ToolPage toolId="pdf-compress" schema={schema} />;
}
