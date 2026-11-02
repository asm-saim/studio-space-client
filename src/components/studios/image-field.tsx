"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/shared/spinner";
import { FieldError } from "@/components/studios/form-parts";

type ImageFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  error?: string;
};

const MAX_BYTES = 5 * 1024 * 1024;

export function ImageField({ id, label, value, onChange, onRemove, error }: ImageFieldProps) {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const showPreview = /^https:\/\/\S+$/.test(value.trim());

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > MAX_BYTES) {
      toast.error("Images must be 5 MB or smaller.");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.url) throw new Error(data?.message ?? "Image upload failed.");
      onChange(data.url);
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or upload a file"
          inputMode="url"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
          onChange={handleFile}
        />
        <Button type="button" variant="outline" disabled={uploading} onClick={() => fileRef.current?.click()}>
          {uploading ? <Spinner /> : <Upload aria-hidden="true" />}
          {uploading ? "Uploading…" : "Upload"}
        </Button>
        {onRemove && (
          <Button type="button" variant="ghost" size="icon" aria-label={`Remove ${label}`} onClick={onRemove}>
            <X aria-hidden="true" />
          </Button>
        )}
      </div>
      <FieldError id={`${id}-error`} message={error} />
      {showPreview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value.trim()} alt="" className="h-40 w-full rounded-lg border object-cover sm:w-72" />
      )}
    </div>
  );
}
