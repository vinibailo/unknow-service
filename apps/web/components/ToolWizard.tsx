'use client';

import { useState, useCallback, FormEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { z, ZodObject } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ToolWizardProps<T extends ZodObject<any>> {
  schema: T;
  onRun: (file: File, values: z.infer<T>) => Promise<{ downloadUrl: string }>;
}

export function ToolWizard<T extends ZodObject<any>>({ schema, onRun }: ToolWizardProps<T>) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [values, setValues] = useState<Record<string, any>>({});
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const parsed = schema.parse(values);
    const result = await onRun(file, parsed);
    setDownloadUrl(result.downloadUrl);
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setFile(null);
    setValues({});
    setDownloadUrl(null);
  };

  const fields = Object.entries(schema.shape).map(([key]) => (
    <div key={key} className="mb-4">
      <label className="block text-sm font-medium mb-1">{key}</label>
      <Input
        value={values[key] ?? ''}
        onChange={(e) => handleChange(key, e.target.value)}
      />
    </div>
  ));

  return (
    <div className="space-y-6">
      {step === 1 && (
        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded p-10 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {file ? (
            <p>
              {file.name} - {Math.round(file.size / 1024)} KB
            </p>
          ) : (
            <p>{isDragActive ? 'Drop the file here' : 'Drag and drop or click to upload'}</p>
          )}
          {file && (
            <Button className="mt-4" onClick={() => setStep(2)}>
              Next
            </Button>
          )}
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {fields}
          <Button type="submit" className="w-full">
            Run
          </Button>
        </form>
      )}

      {step === 3 && downloadUrl && (
        <div className="text-center space-y-4">
          <div className="p-6 border rounded">
            <p className="text-green-600 font-semibold mb-4">Success!</p>
            <Button asChild size="lg">
              <a href={downloadUrl} download>
                Download
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Files are retained for a limited time.
            </p>
            <Button variant="ghost" onClick={reset} className="mt-2">
              Run another job
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
