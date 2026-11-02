"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { createStudio, updateStudio } from "@/lib/mutations";
import { AmenitiesPicker } from "@/components/studios/amenities-picker";
import { FieldError, selectClass, textareaClass } from "@/components/studios/form-parts";
import { Spinner } from "@/components/shared/spinner";
import { ImageField } from "@/components/studios/image-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Studio, StudioInput } from "@/lib/studios";
import { STUDIO_CATEGORIES } from "../home/categories";

type Values = {
  title: string;
  category: string;
  hourlyRate: string;
  securityDeposit: string;
  maxCapacity: string;
  location: string;
  image: string;
  overview: string;
};

type Errors = Partial<Record<keyof Values | "images" | "amenities", string>>;

type StudioFormProps = {
  mode: "create" | "edit";
  studioId?: string;
  initial?: Studio;
  host: { name: string; email: string };
};

const MAX_EXTRA_IMAGES = 4;

const isHttps = (value: string) => /^https:\/\/\S+$/.test(value);

function validate(v: Values, extras: string[]): Errors {
  const e: Errors = {};
  const title = v.title.trim();
  if (title.length < 3 || title.length > 100) e.title = "Title must be 3–100 characters.";
  if (!STUDIO_CATEGORIES.some((c) => c.slug === v.category)) e.category = "Choose a category.";
  if (!v.hourlyRate || !(Number(v.hourlyRate) > 0)) e.hourlyRate = "Enter an hourly rate above $0.";
  if (!(Number(v.securityDeposit || 0) >= 0)) e.securityDeposit = "Deposit can't be negative.";
  const capacity = Number(v.maxCapacity);
  if (!Number.isInteger(capacity) || capacity < 1) e.maxCapacity = "Enter a whole number of at least 1.";
  if (v.location.trim().length < 3) e.location = "Enter the studio address.";
  if (!isHttps(v.image.trim())) e.image = "Add a cover image (an https:// link or an upload).";
  if (extras.some((u) => u.trim() && !isHttps(u.trim()))) e.images = "Every extra image must be an https:// link.";
  if (v.overview.trim().length < 20) e.overview = "Write at least 20 characters about the space.";
  return e;
}

export function StudioForm({ mode, studioId, initial, host }: StudioFormProps) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [values, setValues] = React.useState<Values>({
    title: initial?.title ?? "",
    category: initial?.category ?? "",
    hourlyRate: initial ? String(initial.hourlyRate) : "",
    securityDeposit: initial ? String(initial.securityDeposit) : "0",
    maxCapacity: initial ? String(initial.maxCapacity) : "",
    location: initial?.location ?? "",
    image: initial?.image ?? "",
    overview: initial?.overview ?? "",
  });
  const [extraImages, setExtraImages] = React.useState<string[]>(initial?.images.slice(1) ?? []);
  const [amenities, setAmenities] = React.useState<string[]>(initial?.amenities ?? []);
  const [errors, setErrors] = React.useState<Errors>({});

  function setValue<K extends keyof Values>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values, extraImages);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const input: StudioInput = {
      title: values.title.trim(),
      category: values.category,
      hourlyRate: Number(values.hourlyRate),
      securityDeposit: Number(values.securityDeposit || 0),
      maxCapacity: Number(values.maxCapacity),
      location: values.location.trim(),
      image: values.image.trim(),
      images: extraImages.map((u) => u.trim()).filter(Boolean),
      amenities,
      overview: values.overview.trim(),
    };

    startTransition(async () => {
      const result = mode === "create" ? await createStudio(input) : await updateStudio(studioId ?? "", input);
      if (!result.ok) {
        if (result.fieldErrors) setErrors((prev) => ({ ...prev, ...(result.fieldErrors as Errors) }));
        toast.error(result.error);
        return;
      }
      toast.success(mode === "create" ? "Studio added successfully!" : "Studio updated successfully!");
      router.push("/my-listings");
    });
  }

  const invalid = (key: keyof Errors) => !!errors[key];
  const describedBy = (key: keyof Errors) => (errors[key] ? `${key}-error` : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8 rounded-2xl border bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={values.title} onChange={(e) => setValue("title", e.target.value)} placeholder="e.g. Northlight Photo Loft" aria-invalid={invalid("title")} aria-describedby={describedBy("title")} />
          <FieldError id="title-error" message={errors.title} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="category">Category</Label>
          <select id="category" value={values.category} onChange={(e) => setValue("category", e.target.value)} className={selectClass} aria-invalid={invalid("category")} aria-describedby={describedBy("category")}>
            <option value="" disabled>
              Select a category
            </option>
            {STUDIO_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
          <FieldError id="category-error" message={errors.category} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hourlyRate">Hourly rate ($)</Label>
          <Input id="hourlyRate" type="number" inputMode="decimal" min="1" step="any" value={values.hourlyRate} onChange={(e) => setValue("hourlyRate", e.target.value)} placeholder="45" aria-invalid={invalid("hourlyRate")} aria-describedby={describedBy("hourlyRate")} />
          <FieldError id="hourlyRate-error" message={errors.hourlyRate} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="securityDeposit">Security deposit ($)</Label>
          <Input id="securityDeposit" type="number" inputMode="decimal" min="0" step="any" value={values.securityDeposit} onChange={(e) => setValue("securityDeposit", e.target.value)} placeholder="100" aria-invalid={invalid("securityDeposit")} aria-describedby={describedBy("securityDeposit")} />
          <FieldError id="securityDeposit-error" message={errors.securityDeposit} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxCapacity">Max capacity (people)</Label>
          <Input id="maxCapacity" type="number" inputMode="numeric" min="1" step="1" value={values.maxCapacity} onChange={(e) => setValue("maxCapacity", e.target.value)} placeholder="10" aria-invalid={invalid("maxCapacity")} aria-describedby={describedBy("maxCapacity")} />
          <FieldError id="maxCapacity-error" message={errors.maxCapacity} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location / address</Label>
          <Input id="location" value={values.location} onChange={(e) => setValue("location", e.target.value)} placeholder="Street, city" autoComplete="street-address" aria-invalid={invalid("location")} aria-describedby={describedBy("location")} />
          <FieldError id="location-error" message={errors.location} />
        </div>
      </div>

      <div className="space-y-5">
        <ImageField id="image" label="Cover image URL" value={values.image} onChange={(v) => setValue("image", v)} error={errors.image} />

        {extraImages.map((url, index) => (
          <ImageField
            key={index}
            id={`extra-image-${index}`}
            label={`Gallery image ${index + 1}`}
            value={url}
            onChange={(v) => setExtraImages((prev) => prev.map((u, i) => (i === index ? v : u)))}
            onRemove={() => setExtraImages((prev) => prev.filter((_, i) => i !== index))}
          />
        ))}
        <FieldError id="images-error" message={errors.images} />

        {extraImages.length < MAX_EXTRA_IMAGES && (
          <Button type="button" variant="outline" onClick={() => setExtraImages((prev) => [...prev, ""])}>
            <Plus aria-hidden="true" />
            Add gallery image
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label>Amenities</Label>
        <AmenitiesPicker value={amenities} onChange={setAmenities} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="overview">Detailed overview</Label>
        <textarea id="overview" value={values.overview} onChange={(e) => setValue("overview", e.target.value)} placeholder="Describe the space, the equipment, house rules, and what makes it a good fit." className={textareaClass} aria-invalid={invalid("overview")} aria-describedby={describedBy("overview")} />
        <FieldError id="overview-error" message={errors.overview} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="hostName">Host name</Label>
          <Input id="hostName" value={host.name} readOnly aria-readonly="true" className="text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hostEmail">Host email</Label>
          <Input id="hostEmail" value={host.email} readOnly aria-readonly="true" className="text-muted-foreground" />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" size="lg" className="h-11" nativeButton={false} render={<Link href="/my-listings" />}>
          Cancel
        </Button>
        <Button type="submit" size="lg" className="h-11" disabled={pending}>
          {pending && <Spinner />}
          {pending ? "Saving…" : mode === "create" ? "Add studio" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}