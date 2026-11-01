"use client";

import * as React from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const PRESET_AMENITIES = [
  "Natural light",
  "Blackout curtains",
  "Backdrop paper",
  "Green screen",
  "Lighting kit",
  "Soundproofing",
  "Mic & monitors",
  "Mixing console",
  "Instruments",
  "Wi-Fi",
  "Air conditioning",
  "Changing room",
  "Restroom",
  "Kitchenette",
  "Parking",
];

type AmenitiesPickerProps = {
  value: string[];
  onChange: (next: string[]) => void;
};

export function AmenitiesPicker({ value, onChange }: AmenitiesPickerProps) {
  const [custom, setCustom] = React.useState("");
  const options = [...PRESET_AMENITIES, ...value.filter((item) => !PRESET_AMENITIES.includes(item))];

  function toggle(item: string) {
    onChange(value.includes(item) ? value.filter((v) => v !== item) : [...value, item]);
  }

  function addCustom() {
    const item = custom.trim();
    if (!item) return;
    if (!value.includes(item)) onChange([...value, item]);
    setCustom("");
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Amenities">
        {options.map((item) => {
          const on = value.includes(item);
          return (
            <button
              key={item}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(item)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                on ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {on && <Check aria-hidden="true" className="size-3.5 text-primary" />}
              {item}
            </button>
          );
        })}
      </div>
      <div className="flex gap-2">
        <Input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
          placeholder="Add another amenity"
          maxLength={40}
          aria-label="Add a custom amenity"
        />
        <Button type="button" variant="outline" onClick={addCustom}>
          <Plus aria-hidden="true" />
          Add
        </Button>
      </div>
    </div>
  );
}