import { NextResponse, NextRequest } from "next/server";
import { Queue } from "bullmq";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { ipRateLimit, userRateLimit } from "@/lib/ratelimit";
import { verifyCaptcha } from "@/lib/captcha";

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT || 6379),
};

const slugToQueue: Record<string, string> = {
  "pdf-merge": "pdf",
  "pdf-split": "pdf",
  "pdf-compress": "pdf",
  "pdf-to-jpg": "pdf",
  "img-bg-remove": "image",
  "img-resize": "image",
  "img-compress": "image",
  "video-compress": "video",
  "mp4-to-mp3": "video",
  "paragraph-rewriter": "ai",
};

const heavySlugs = new Set([
  "video-compress",
  "mp4-to-mp3",
  "img-bg-remove",
  "paragraph-rewriter",
]);

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await auth();
  const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown";
  const ipCheck = await ipRateLimit.limit(ip);
  if (!ipCheck.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  if (session) {
    const userCheck = await userRateLimit.limit(session.user.id);
    if (!userCheck.success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  }

  const slug = params.slug;
  const queueName = slugToQueue[slug];
  if (!queueName) {
    return NextResponse.json({ error: "Unknown tool" }, { status: 400 });
  }

  const body = await req.json();
  const { fileId, captchaToken, ...rest } = body;

  if (!session && heavySlugs.has(slug)) {
    const ok = await verifyCaptcha(captchaToken);
    if (!ok) {
      return NextResponse.json({ error: "Captcha required" }, { status: 400 });
    }
  }

  const jobRecord = await prisma.job.create({
    data: { tool: slug, params: rest },
  });

  const queue = new Queue(queueName, { connection });
  const job = await queue.add(slug, { fileId, params: rest }, { jobId: jobRecord.id });
  const result = await job.waitUntilFinished();
  const outputFileId = (result && result.fileId) || fileId;

  await prisma.job.update({
    where: { id: jobRecord.id },
    data: { status: "COMPLETED", progress: 100, outputFileId },
  });

  return NextResponse.json({ fileId: outputFileId });
}
