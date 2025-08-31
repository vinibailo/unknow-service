import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { s3, BUCKET } from "@/lib/s3";
import { CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";

export async function POST(req: Request) {
  const { fileId, uploadId, parts } = await req.json();
  const file = await prisma.file.findUnique({ where: { id: fileId } });
  if (!file) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await s3.send(
    new CompleteMultipartUploadCommand({
      Bucket: BUCKET,
      Key: file.key,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts }
    })
  );

  return NextResponse.json({ ok: true });
}
