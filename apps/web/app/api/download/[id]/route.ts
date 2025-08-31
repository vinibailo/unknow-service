import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { s3, BUCKET } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const file = await prisma.file.findUnique({ where: { id: params.id } });
  if (!file) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const command = new GetObjectCommand({ Bucket: BUCKET, Key: file.key });
  const url = await getSignedUrl(s3, command, { expiresIn: 60 });
  return NextResponse.json({ url, name: file.name });
}
