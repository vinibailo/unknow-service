"use client";

import { useState } from "react";
import { Dropzone } from "./Dropzone";
import { RetentionNote } from "./RetentionNote";

interface UploadedPart {
  ETag: string;
  PartNumber: number;
}

export function ToolPageTemplate() {
  const [fileId, setFileId] = useState<string | null>(null);

  const upload = async (file: File, onProgress: (p: number) => void) => {
    const initRes = await fetch("/api/upload/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: file.name,
        type: file.type,
        size: file.size
      })
    });
    const initData = await initRes.json();
    const { uploadId, parts, fileId: id } = initData;

    const uploadedParts: UploadedPart[] = [];
    const chunkSize = 5 * 1024 * 1024;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const blob = file.slice(start, end);
      const res = await fetch(part.url, {
        method: "PUT",
        body: blob
      });
      const etag = res.headers.get("ETag") || "";
      uploadedParts.push({ ETag: etag, PartNumber: part.partNumber });
      onProgress(((i + 1) / parts.length) * 100);
    }

    await fetch("/api/upload/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId: id, uploadId, parts: uploadedParts })
    });

    setFileId(id);
  };

  if (fileId) {
    return (
      <div className="space-y-4">
        <a
          href={`/api/download/${fileId}`}
          className="text-primary underline"
        >
          Download file
        </a>
        <RetentionNote />
      </div>
    );
  }

  return <Dropzone onUpload={upload} />;
}
