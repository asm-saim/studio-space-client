"use server";

import { updateTag } from "next/cache";

import type { StudioInput } from "@/lib/studios";
import { getSessionUser } from "@/lib/session";
import { apiRequest } from "@/lib/api";
import { ActionResult, toActionError } from "@/lib/action-result";

const LOGIN_REQUIRED = { ok: false, error: "Please log in to continue." } as const;

export async function createStudio(input: StudioInput): Promise<ActionResult<{ id: string }>> {
  const user = await getSessionUser();
  if (!user) return LOGIN_REQUIRED;
  try {
    const { id } = await apiRequest<{ id: string }>("/studios", { method: "POST", body: input, user });
    updateTag("studios");
    return { ok: true, id };
  } catch (error) {
    return toActionError(error);
  }
}

export async function updateStudio(id: string, input: StudioInput): Promise<ActionResult> {
  const user = await getSessionUser();
  if (!user) return LOGIN_REQUIRED;
  try {
    await apiRequest(`/studios/${encodeURIComponent(id)}`, { method: "PUT", body: input, user });
    updateTag("studios");
    return { ok: true };
  } catch (error) {
    return toActionError(error);
  }
}

export async function deleteStudio(id: string): Promise<ActionResult> {
  const user = await getSessionUser();
  if (!user) return LOGIN_REQUIRED;
  try {
    await apiRequest(`/studios/${encodeURIComponent(id)}`, { method: "DELETE", user });
    updateTag("studios");
    return { ok: true };
  } catch (error) {
    return toActionError(error);
  }
}