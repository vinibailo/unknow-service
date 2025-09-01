import { ToolPage } from "@/components/ToolPage";
import { z } from "zod";

const schema = z.object({ pages: z.string().optional() });

export default function Page() {
  return <ToolPage toolId="pdf-split" schema={schema} />;
}
