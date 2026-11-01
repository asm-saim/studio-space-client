"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PasswordFieldProps = Omit<React.ComponentProps<typeof Input>, "type">;

export function PasswordField({ className, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="relative">
      <Input {...props} type={visible ? "text" : "password"} className={cn("pr-11", className)} />
      <div className="absolute inset-y-0 right-1 flex items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
          className="size-8 text-muted-foreground"
        >
          {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
        </Button>
      </div>
    </div>
  );
}