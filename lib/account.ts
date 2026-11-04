"use client";

import type { Account } from "./types";

const USERS_KEY = "franko.accounts.v1";
const SESSION_KEY = "franko.session.v1";
export const ACCOUNT_EVENT = "franko:account";

const readJSON = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJSON = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
};

const emit = () =>
  window.dispatchEvent(new CustomEvent(ACCOUNT_EVENT));

export const normaliseEmail = (email: string) => email.trim().toLowerCase();

/** SHA-256 when the browser exposes Web Crypto, otherwise a small deterministic digest. */
async function digest(value: string): Promise<string> {
  const subtle = typeof crypto !== "undefined" ? crypto.subtle : undefined;
  if (subtle) {
    try {
      const bytes = new TextEncoder().encode(value);
      const hash = await subtle.digest("SHA-256", bytes);
      return Array.from(new Uint8Array(hash))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    } catch {
      /* fall through */
    }
  }
  let h1 = 0x811c9dc5;
  let h2 = 0x1000193;
  for (let i = 0; i < value.length; i += 1) {
    h1 = (h1 ^ value.charCodeAt(i)) * 0x01000193;
    h2 = (h2 + value.charCodeAt(i) * (i + 7)) * 0x01000193;
  }
  return `${(h1 >>> 0).toString(16)}${(h2 >>> 0).toString(16)}`;
}

export const hashPassword = (email: string, password: string) =>
  digest(`${normaliseEmail(email)}::franko::${password}`);

export function loadAccounts(): Account[] {
  const accounts = readJSON<Account[]>(USERS_KEY, []);
  return Array.isArray(accounts) ? accounts : [];
}

export function findAccount(email: string): Account | undefined {
  const target = normaliseEmail(email);
  return loadAccounts().find((account) => account.email === target);
}

export function currentAccount(): Account | null {
  if (typeof window === "undefined") return null;
  const id = window.localStorage.getItem(SESSION_KEY);
  if (!id) return null;
  return loadAccounts().find((account) => account.id === id) ?? null;
}

export type SignUpResult =
  | { ok: true; account: Account }
  | { ok: false; error: string };

export async function signUp(input: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<SignUpResult> {
  const email = normaliseEmail(input.email);
  if (findAccount(email)) {
    return { ok: false, error: "An account already exists for that email. Sign in instead." };
  }
  const account: Account = {
    id: `acc_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
    name: input.name.trim(),
    email,
    phone: input.phone.trim(),
    passwordHash: await hashPassword(email, input.password),
    createdAt: new Date().toISOString(),
  };
  writeJSON(USERS_KEY, [...loadAccounts(), account]);
  window.localStorage.setItem(SESSION_KEY, account.id);
  emit();
  return { ok: true, account };
}

export type SignInResult =
  | { ok: true; account: Account }
  | { ok: false; error: string };

export async function signIn(email: string, password: string): Promise<SignInResult> {
  const account = findAccount(email);
  if (!account) {
    return { ok: false, error: "No account for that email. Create one in a few seconds." };
  }
  const hash = await hashPassword(account.email, password);
  if (hash !== account.passwordHash) {
    return { ok: false, error: "That password does not match this account." };
  }
  window.localStorage.setItem(SESSION_KEY, account.id);
  emit();
  return { ok: true, account };
}

export function signOut() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
  emit();
}

export async function updateAccount(
  id: string,
  patch: Partial<Pick<Account, "name" | "phone">>,
): Promise<Account | null> {
  const accounts = loadAccounts();
  const index = accounts.findIndex((account) => account.id === id);
  if (index === -1) return null;
  const next = { ...accounts[index], ...patch };
  accounts[index] = next;
  writeJSON(USERS_KEY, accounts);
  emit();
  return next;
}

export const subscribeAccount = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(ACCOUNT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(ACCOUNT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};
