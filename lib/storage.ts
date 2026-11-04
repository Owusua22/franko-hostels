"use client";

import type { Application } from "./types";

const KEY = "franko.applications.v2";
export const APPLICATIONS_EVENT = "franko:applications";

export function loadApplications(): Application[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Application[]) : [];
  } catch {
    return [];
  }
}

export function loadApplicationsFor(accountId: string): Application[] {
  return loadApplications().filter((application) => application.accountId === accountId);
}

export function saveApplication(application: Application): Application[] {
  const next = [application, ...loadApplications()];
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(APPLICATIONS_EVENT));
  } catch {
    /* storage unavailable: the success screen still works */
  }
  return next;
}

export function withdrawApplication(reference: string): Application[] {
  const next = loadApplications().filter(
    (application) => application.reference !== reference,
  );
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(APPLICATIONS_EVENT));
  } catch {
    /* ignore */
  }
  return next;
}

export function makeReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let tail = "";
  for (let i = 0; i < 5; i += 1) {
    tail += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `FH-${new Date().getFullYear().toString().slice(2)}-${tail}`;
}
