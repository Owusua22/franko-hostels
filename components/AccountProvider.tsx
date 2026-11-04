"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Account, Application } from "@/lib/types";
import {
  currentAccount,
  signIn as doSignIn,
  signOut as doSignOut,
  signUp as doSignUp,
  subscribeAccount,
  updateAccount,
} from "@/lib/account";
import { APPLICATIONS_EVENT, loadApplicationsFor } from "@/lib/storage";
import AuthModal from "./AuthModal";

type AuthMode = "signup" | "signin";

type AccountContextValue = {
  user: Account | null;
  ready: boolean;
  applications: Application[];
  signUp: typeof doSignUp;
  signIn: typeof doSignIn;
  signOut: () => void;
  updateProfile: (patch: { name?: string; phone?: string }) => Promise<void>;
  refresh: () => void;
  openAuth: (mode?: AuthMode) => void;
  requireAccount: (action: () => void) => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error("useAccount must be used inside AccountProvider");
  return context;
}

export default function AccountProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Account | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [ready, setReady] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const pendingRef = useRef<(() => void) | null>(null);

  const sync = useCallback(() => {
    const account = currentAccount();
    setUser(account);
    setApplications(account ? loadApplicationsFor(account.id) : []);
  }, []);

  useEffect(() => {
    sync();
    setReady(true);
    const unsubscribe = subscribeAccount(sync);
    window.addEventListener(APPLICATIONS_EVENT, sync);
    return () => {
      unsubscribe();
      window.removeEventListener(APPLICATIONS_EVENT, sync);
    };
  }, [sync]);

  const openAuth = useCallback((mode: AuthMode = "signup") => {
    setAuthMode(mode);
    setAuthOpen(true);
  }, []);

  const requireAccount = useCallback(
    (action: () => void) => {
      if (currentAccount()) {
        action();
        return;
      }
      pendingRef.current = action;
      setAuthMode("signup");
      setAuthOpen(true);
    },
    [],
  );

  const handleAuthed = useCallback(() => {
    sync();
    setAuthOpen(false);
    const pending = pendingRef.current;
    pendingRef.current = null;
    if (pending) window.setTimeout(pending, 60);
  }, [sync]);

  const signOut = useCallback(() => {
    doSignOut();
    sync();
  }, [sync]);

  const updateProfile = useCallback(
    async (patch: { name?: string; phone?: string }) => {
      if (!user) return;
      await updateAccount(user.id, patch);
      sync();
    },
    [user, sync],
  );

  return (
    <AccountContext.Provider
      value={{
        user,
        ready,
        applications,
        signUp: doSignUp,
        signIn: doSignIn,
        signOut,
        updateProfile,
        refresh: sync,
        openAuth,
        requireAccount,
      }}
    >
      {children}
      {authOpen && (
        <AuthModal
          initialMode={authMode}
          onClose={() => {
            pendingRef.current = null;
            setAuthOpen(false);
          }}
          onAuthenticated={handleAuthed}
        />
      )}
    </AccountContext.Provider>
  );
}
