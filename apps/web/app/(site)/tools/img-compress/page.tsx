import { ToolPage } from "@/components/ToolPage";
import { z } from "zod";

const schema = z.object({ quality: z.string().optional() });

export default function Page() {
  return <ToolPage toolId="img-compress" schema={schema} />;
}
