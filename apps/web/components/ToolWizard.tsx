'use client';

import { useState, useCallback, FormEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { z, ZodObject } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Captcha } from './Captcha';
import { useToast } from './ToastProvider';
import { tools } from '@/constants/tools';
import { ToolCard } from './ToolCard';

interface ToolWizardProps<T extends ZodObject<any>> {
  toolId: string;
  schema: T;
  onRun: (
    file: File,
    values: z.infer<T>,
    captchaToken?: string,
  ) => Promise<{ downloadUrl: string }>;
  requireCaptcha?: boolean;
}

export function ToolWizard<T extends ZodObject<any>>({ toolId, schema, onRun, requireCaptcha }: ToolWizardProps<T>) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [values, setValues] = useState<Record<string, any>>({});
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const toast = useToast();
  const tool = tools.find((t) => t.id === toolId)!;

  const onDrop = useCallback((accepted: File[]) => {
    setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.files[0];
    if (pasted) setFile(pasted);
  };

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    if (requireCaptcha && !captchaToken) return;
    const parsed = schema.parse(values);
    toast('Job enqueued');
    try {
      const result = await onRun(file, parsed, captchaToken || undefined);
      setDownloadUrl(result.downloadUrl);
      toast('Job complete', 'success');
      setStep(3);
    } catch (err) {
      toast('Error running tool', 'error');
    }
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
          onPaste={onPaste}
          tabIndex={0}
          className={`border-2 border-dashed rounded p-10 text-center cursor-pointer ${
            isDragActive ? 'bg-muted border-primary' : ''
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p>
              {file.name} - {Math.round(file.size / 1024)} KB
            </p>
          ) : (
            <p>{isDragActive ? 'Drop the file here' : 'Drag and drop, click, or paste to upload'}</p>
          )}
          {file && (
            <Button className="mt-4" onClick={() => setStep(2)}>
              Next
            </Button>
          )}
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          {fields}
          {requireCaptcha && <Captcha onVerify={setCaptchaToken} />}
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
              Run again
            </Button>
          </div>
          {tools.filter((t) => t.category === tool.category && t.id !== toolId).slice(0,3).length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">Try related tools</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {tools
                  .filter((t) => t.category === tool.category && t.id !== toolId)
                  .slice(0, 3)
                  .map((r) => (
                    <ToolCard key={r.id} {...r} />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
