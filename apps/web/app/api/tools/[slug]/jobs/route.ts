import { NextResponse } from "next/server";
import { Queue } from "bullmq";
import { prisma } from "@/lib/db";

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

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const queueName = slugToQueue[slug];
  if (!queueName) {
    return NextResponse.json({ error: "Unknown tool" }, { status: 400 });
  }

  const body = await req.json();
  const { fileId, ...rest } = body;

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
