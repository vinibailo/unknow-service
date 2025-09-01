"use client";

import { z, ZodObject } from "zod";
import { ToolWizard } from "./ToolWizard";
import { tools, categorySlugs } from "@/constants/tools";
import { Breadcrumbs } from "./Breadcrumbs";
import { runTool } from "@/lib/runTool";

interface ToolPageProps<T extends ZodObject<any>> {
  toolId: string;
  schema: T;
  requireCaptcha?: boolean;
}

export function ToolPage<T extends ZodObject<any>>({ toolId, schema, requireCaptcha }: ToolPageProps<T>) {
  const tool = tools.find((t) => t.id === toolId)!;
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          {
            href: `/tools/${categorySlugs[tool.category]}`,
            label: `${tool.category} Tools`,
          },
          { href: `/tools/${tool.id}`, label: tool.title },
        ]}
      />
      <ToolWizard
        toolId={toolId}
        schema={schema}
        requireCaptcha={requireCaptcha}
        onRun={(file, values, token) =>
          runTool(toolId, file, { ...values, captchaToken: token })
        }
      />
    </div>
  );
}
