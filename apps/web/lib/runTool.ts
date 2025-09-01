"use client";

interface UploadedPart {
  ETag: string;
  PartNumber: number;
}

const CHUNK_SIZE = 5 * 1024 * 1024;

async function uploadFile(file: File) {
  const initRes = await fetch("/api/upload/init", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: file.name,
      type: file.type,
      size: file.size,
    }),
  });
  const initData = await initRes.json();
  const { uploadId, parts, fileId } = initData;

  const uploadedParts: UploadedPart[] = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const blob = file.slice(start, end);
    const res = await fetch(part.url, { method: "PUT", body: blob });
    const etag = res.headers.get("ETag") || "";
    uploadedParts.push({ ETag: etag, PartNumber: part.partNumber });
  }

  await fetch("/api/upload/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileId, uploadId, parts: uploadedParts }),
  });

  return fileId as string;
}

export async function runTool(
  slug: string,
  file: File,
  params: Record<string, any>
) {
  const fileId = await uploadFile(file);
  const res = await fetch(`/api/tools/${slug}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileId, ...params }),
  });
  const data = await res.json();
  const downloadRes = await fetch(`/api/download/${data.fileId}`);
  const { url } = await downloadRes.json();
  return { downloadUrl: url };
}
