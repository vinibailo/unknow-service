"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onUpload: (file: File, onProgress: (p: number) => void) => Promise<void>;
}

export function Dropzone({ onUpload }: DropzoneProps) {
  const [progress, setProgress] = useState(0);

  const handleFile = useCallback(
    (file: File) => {
      void onUpload(file, setProgress);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: (files) => {
      if (files[0]) handleFile(files[0]);
    }
  });

  const onPaste = (e: React.ClipboardEvent) => {
    const file = e.clipboardData.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      {...getRootProps()}
      onPaste={onPaste}
      className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed p-8 text-center cursor-pointer ${
        isDragActive ? "bg-muted" : ""
      }`}
    >
      <input {...getInputProps()} />
      <p>Drag & drop or paste files here</p>
      {progress > 0 && (
        <div className="mt-4 h-2 w-full rounded bg-muted">
          <div
            className="h-2 rounded bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
