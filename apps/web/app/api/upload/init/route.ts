import { NextResponse } from "next/server";
import {
  CreateMultipartUploadCommand,
  UploadPartCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@/lib/db";
import { s3, BUCKET } from "@/lib/s3";

const PART_SIZE = 5 * 1024 * 1024;

export async function POST(req: Request) {
  const { name, type, size } = await req.json();
  const key = `${crypto.randomUUID()}-${name}`;
  const expiresAt = new Date(Date.now() + 70 * 60 * 1000);

  const create = await s3.send(
    new CreateMultipartUploadCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: type
    })
  );

  const uploadId = create.UploadId!;
  const partCount = Math.ceil(size / PART_SIZE);

  const parts = await Promise.all(
    Array.from({ length: partCount }, async (_, i) => {
      const command = new UploadPartCommand({
        Bucket: BUCKET,
        Key: key,
        UploadId: uploadId,
        PartNumber: i + 1
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return { partNumber: i + 1, url };
    })
  );

  const file = await prisma.file.create({
    data: { key, name, size, expiresAt }
  });

  return NextResponse.json({
    uploadId,
    parts,
    fileId: file.id,
    key
  });
}
