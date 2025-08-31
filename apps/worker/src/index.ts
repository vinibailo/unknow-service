import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "./db";
import { s3, BUCKET } from "./s3";

async function cleanupExpired() {
  const expired = await prisma.file.findMany({
    where: { expiresAt: { lt: new Date() } }
  });

  for (const file of expired) {
    await s3.send(
      new DeleteObjectCommand({ Bucket: BUCKET, Key: file.key })
    );
    await prisma.file.delete({ where: { id: file.id } });
  }
}

export function main() {
  console.log("Worker ready");
  void cleanupExpired();
  setInterval(cleanupExpired, 5 * 60 * 1000);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
