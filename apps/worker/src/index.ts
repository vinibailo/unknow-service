import { Worker } from "bullmq";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "./db";
import { s3, BUCKET } from "./s3";

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT || 6379),
};

type JobData = {
  fileId: string;
  params?: Record<string, any>;
};

async function genericHandler(job: any) {
  await job.updateProgress(100);
  return { fileId: (job.data as JobData).fileId };
}

async function cleanupExpired() {
  const expired = await prisma.file.findMany({
    where: { expiresAt: { lt: new Date() } },
  });

  for (const file of expired) {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: file.key }));
    await prisma.file.delete({ where: { id: file.id } });
  }
}

export function main() {
  new Worker("pdf", genericHandler, { connection });
  new Worker("image", genericHandler, { connection });
  new Worker("video", genericHandler, { connection });
  new Worker("ai", genericHandler, { connection });
  console.log("Worker ready");
  void cleanupExpired();
  setInterval(cleanupExpired, 5 * 60 * 1000);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
