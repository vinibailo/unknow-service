import { ToolPage } from "@/components/ToolPage";
import { z } from "zod";

const schema = z.object({});

export default function Page() {
  return <ToolPage toolId="pdf-to-jpg" schema={schema} />;
}
