"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount } from "./AccountProvider";
import { ArrowRight, CheckIcon, CloseIcon, UserIcon } from "./icons";

type Mode = "signup" | "signin";

export default function AuthModal({
  initialMode = "signup",
  onClose,
  onAuthenticated,
}: {
  initialMode?: Mode;
  onClose: () => void;
  onAuthenticated?: () => void;
}) {
  const { signUp, signIn } = useAccount();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("modal-open");
    document.addEventListener("keydown", onKey);
    window.setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (mode === "signup") {
      if (form.name.trim().length < 3) return setError("Enter your full name.");
      if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(form.email.trim()))
        return setError("Enter a valid email address.");
      if (form.phone.trim().length < 9) return setError("Enter a phone number we can reach you on.");
      if (form.password.length < 6) return setError("Use a password with at least 6 characters.");
      if (form.password !== form.confirm) return setError("The two passwords do not match.");
    } else {
      if (!form.email.trim()) return setError("Enter the email on your account.");
      if (!form.password) return setError("Enter your password.");
    }

    setBusy(true);
    const result =
      mode === "signup"
        ? await signUp({
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
          })
        : await signIn(form.email, form.password);
    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    onAuthenticated?.();
    onClose();
  };

  return (
    <div className="overlay" role="presentation" onMouseDown={(e) => e.target === dialogRef.current && onClose()}>
      <div
        className="modal modal--auth"
        role="dialog"
        aria-modal="true"
        aria-label={mode === "signup" ? "Create your account" : "Sign in"}
        ref={dialogRef}
      >
        <div className="modal__head">
          <div>
            <span className="modal__room">
              <CheckIcon size={11} /> {mode === "signup" ? "Create account" : "Welcome back"}
            </span>
            <h3 className="modal__title">
              {mode === "signup" ? "Sign up to start your Application" : "Sign in to Franko"}
            </h3>
            <p className="modal__sub">
              {mode === "signup"
                ? "Track your applications, your bed and your check-in date in one place."
                : "Your applications and saved rooms are waiting for you."}
            </p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <CloseIcon size={15} />
          </button>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Account">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signup"}
            onClick={() => {
              setMode("signup");
              setError("");
            }}
          >
            Sign up
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signin"}
            onClick={() => {
              setMode("signin");
              setError("");
            }}
          >
            Sign in
          </button>
        </div>

        <form onSubmit={submit} noValidate>
          <div className="modal__body">
            <div className="form-grid">
              {mode === "signup" && (
                <div className="field field--full">
                  <label htmlFor="authName">
                    Full name <span>*</span>
                  </label>
                  <input
                    id="authName"
                    ref={firstFieldRef}
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Ama Serwaa Boateng"
                    autoComplete="name"
                  />
                </div>
              )}

              <div className={`field${mode === "signin" ? " field--full" : ""}`}>
                <label htmlFor="authEmail">
                  Email <span>*</span>
                </label>
                <input
                  id="authEmail"
                  ref={mode === "signin" ? firstFieldRef : undefined}
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="ama@ug.edu.gh"
                  autoComplete="email"
                />
              </div>

              {mode === "signup" && (
                <div className="field">
                  <label htmlFor="authPhone">
                    Phone / WhatsApp <span>*</span>
                  </label>
                  <input
                    id="authPhone"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="024 000 0000"
                    autoComplete="tel"
                  />
                </div>
              )}

              <div className={`field${mode === "signin" ? " field--full" : ""}`}>
                <label htmlFor="authPassword">
                  Password <span>*</span>
                </label>
                <input
                  id="authPassword"
                  type="password"
                  value={form.password}
                  onChange={set("password")}
                  placeholder="At least 6 characters"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
              </div>

              {mode === "signup" && (
                <div className="field">
                  <label htmlFor="authConfirm">
                    Confirm password <span>*</span>
                  </label>
                  <input
                    id="authConfirm"
                    type="password"
                    value={form.confirm}
                    onChange={set("confirm")}
                    placeholder="Repeat it"
                    autoComplete="new-password"
                  />
                </div>
              )}

              {error && (
                <p className="auth-error" role="alert">
                  {error}
                </p>
              )}
            </div>
          </div>

          <div className="modal__foot">
            <span className="modal__foot-note">
              By continuing you accept our{" "}
              <a href="/terms" target="_blank" rel="noreferrer">
                terms
              </a>{" "}
              and{" "}
              <a href="/policies" target="_blank" rel="noreferrer">
                residence policy
              </a>
              .
            </span>
            <button type="submit" className="btn btn--primary" disabled={busy}>
              <UserIcon size={14} className="btn__icon" />
              {busy ? "Please wait" : mode === "signup" ? "Create account" : "Sign in"}
              <ArrowRight size={14} className="btn__arrow" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
