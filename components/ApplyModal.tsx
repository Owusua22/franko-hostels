"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Application, Room } from "@/lib/types";
import { capacityLabel, formatCedis } from "@/lib/rooms";
import { getLocation } from "@/lib/locations";
import { makeReference, saveApplication } from "@/lib/storage";
import { useAccount } from "./AccountProvider";
import { ArrowLeft, ArrowRight, CheckIcon, CloseIcon, ShieldIcon } from "./icons";

type Props = {
  room: Room;
  initialBed: string;
  initialStay?: "semester" | "short";
  initialNights?: number;
  onClose: () => void;
};

type FormState = {
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  institution: string;
  level: string;
  programme: string;
  gender: string;
  bed: string;
  checkIn: string;
  duration: string;
  nights: string;
  guardianName: string;
  guardianPhone: string;
  emergencyName: string;
  emergencyRelationship: string;
  roommate: string;
  notes: string;
};

const INSTITUTIONS = [
  "University of Ghana, Legon",
  "KNUST, Kumasi",
  "University of Cape Coast",
  "Ashesi University",
  "GIMPA",
  "UPSA",
  "Central University",
  "Other institution",
];

const LEVELS = ["Level 100", "Level 200", "Level 300", "Level 400", "Postgraduate"];

const RELATIONSHIPS = ["Parent", "Guardian", "Sibling", "Relative", "Sponsor"];

const STEPS = ["Your details", "Stay & contacts", "Review"];

const today = () => new Date().toISOString().slice(0, 10);

const prettyDate = (iso: string) =>
  iso
    ? new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not set";

export default function ApplyModal({
  room,
  initialBed,
  initialStay = "semester",
  initialNights,
  onClose,
}: Props) {
  const { user } = useAccount();
  const openBeds = useMemo(
    () => room.beds.slice(room.bedsTaken),
    [room.beds, room.bedsTaken],
  );

  const durations = useMemo(() => {
    const base = ["One semester", "Full academic year"];
    return room.nightlyRate !== null ? [...base, "Short let"] : base;
  }, [room.nightlyRate]);

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<Application | null>(null);
  const [declared, setDeclared] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<FormState>({
    fullName: user?.name ?? "",
    studentId: "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    institution: "",
    level: "",
    programme: "",
    gender: "",
    bed: openBeds.includes(initialBed) ? initialBed : openBeds[0] ?? "",
    checkIn: today(),
    duration: initialStay === "short" && room.nightlyRate !== null ? "Short let" : "One semester",
    nights: String(initialNights ?? Math.max(room.minNights, 2)),
    guardianName: "",
    guardianPhone: "",
    emergencyName: "",
    emergencyRelationship: "Parent",
    roommate: "",
    notes: "",
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    document.body.classList.add("modal-open");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector<HTMLInputElement>("input, select")?.focus();
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const set = (key: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateStep = (index: number) => {
    const next: Record<string, string> = {};
    if (index === 0) {
      if (form.fullName.trim().length < 3) next.fullName = "Enter your full name as it appears on your ID.";
      if (!/^[A-Za-z0-9/-]{4,20}$/.test(form.studentId.trim()))
        next.studentId = "Student ID should be 4 to 20 letters or numbers.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
        next.email = "Enter a valid email address.";
      if (form.phone.replace(/\D/g, "").length < 9)
        next.phone = "Enter a reachable phone number.";
      if (!form.institution) next.institution = "Select your institution.";
      if (!form.level) next.level = "Select your level.";
      if (!form.programme.trim()) next.programme = "Tell us what you are studying.";
      if (!form.gender) next.gender = "Select an option.";
    }
    if (index === 1) {
      if (!form.bed) next.bed = "Choose a bed.";
      if (!form.checkIn) next.checkIn = "Pick a check-in date.";
      if (form.guardianName.trim().length < 3) next.guardianName = "Guardian name is required.";
      if (form.guardianPhone.replace(/\D/g, "").length < 9)
        next.guardianPhone = "Enter a guardian phone number.";
      if (form.emergencyName.trim().length < 3)
        next.emergencyName = "Emergency contact name is required.";
      if (form.duration === "Short let") {
        const value = Number(form.nights);
        if (!value || value < room.minNights)
          next.nights = `Enter at least ${room.minNights} nights.`;
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const submit = () => {
    if (!declared) {
      setErrors({ declared: "Please confirm the declaration before submitting." });
      return;
    }
    if (!validateStep(0) || !validateStep(1)) return;
    const application: Application = {
      reference: makeReference(),
      accountId: user?.id ?? "",
      roomId: room.id,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      studentId: form.studentId.trim().toUpperCase(),
      phone: form.phone.trim(),
      institution: form.institution,
      level: form.level,
      programme: form.programme.trim(),
      gender: form.gender,
      bedPreference: form.bed,
      checkIn: form.checkIn,
      duration:
        form.duration === "Short let"
          ? `Short let · ${form.nights} night${form.nights === "1" ? "" : "s"}`
          : form.duration,
      nights: form.nights,
      guardianName: form.guardianName.trim(),
      guardianPhone: form.guardianPhone.trim(),
      emergencyName: form.emergencyName.trim(),
      emergencyRelationship: form.emergencyRelationship,
      notes: form.notes.trim(),
      submittedAt: new Date().toISOString(),
    };
    saveApplication(application);
    setSubmitted(application);
  };

  const nights = Number(form.nights) || 0;
  const firstPayment =
    form.duration === "Short let" && room.nightlyRate
      ? room.nightlyRate * nights
      : room.pricePerSemester * (form.duration === "Full academic year" ? 2 : 1);

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        ref={dialogRef}
      >
        {submitted ? (
          <div className="success">
            <div className="success__mark">
              <CheckIcon size={26} />
            </div>
            <h3>Application received</h3>
            <p>
              Your application for <b>{submitted.roomId}</b> is with the {getLocation(room.locationId).hostel} team.
              Keep your reference: we reply to every applicant within 48 hours.
            </p>
            <div className="success__ref">
              Reference <b>{submitted.reference}</b>
            </div>
            <ul className="success__next">
              <li>
                <CheckIcon size={12} /> <span><b>Within 24 hours</b>: a residence officer calls the number you provided.</span>
              </li>
              <li>
                <CheckIcon size={12} /> <span><b>Within 48 hours</b>: you receive an offer letter and payment instructions by email.</span>
              </li>
              <li>
                <CheckIcon size={12} /> <span><b>On payment</b>: your bed in {submitted.roomId} is locked and check-in details follow.</span>
              </li>
            </ul>
            <button type="button" className="btn btn--primary btn--block" onClick={onClose}>
              <CheckIcon size={14} className="btn__icon" />
              Done
            </button>
            <p style={{ fontSize: 11.5, marginTop: 14 }}>
              A copy of this reference is saved under “My applications” in the header.
            </p>
          </div>
        ) : (
          <>
            <div className="modal__head">
              <div>
                <span className="modal__room">
                  {room.id} · {capacityLabel(room.capacity)}
                </span>
                <h3 className="modal__title" id="apply-title">
                  Apply for this room
                </h3>
                <p className="modal__sub">
                  {formatCedis(room.pricePerSemester)} per semester · {room.block}, floor{" "}
                  {room.floor}
                </p>
              </div>
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Close application form">
                <CloseIcon />
              </button>
            </div>

            <div className="progress">
              {STEPS.map((label, index) => (
                <div key={label} style={{ display: "contents" }}>
                  <div
                    className={`progress__step${
                      index === step
                        ? " progress__step--active"
                        : index < step
                          ? " progress__step--done"
                          : ""
                    }`}
                  >
                    <span className="progress__num">
                      {index < step ? <CheckIcon size={11} /> : index + 1}
                    </span>
                    <span>{label}</span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`progress__bar${index < step ? " progress__bar--done" : ""}`} />
                  )}
                </div>
              ))}
              <span className="progress__count">
                Step {step + 1} of {STEPS.length}
              </span>
            </div>

            <div className="modal__body">
              {step === 0 && (
                <div className="form-grid">
                  <div className={`field field--full${errors.fullName ? " field--error" : ""}`}>
                    <label htmlFor="fullName">Full name <span>*</span></label>
                    <input
                      id="fullName"
                      value={form.fullName}
                      onChange={(event) => set("fullName")(event.target.value)}
                      placeholder="Ama Serwaa Boateng"
                      autoComplete="name"
                    />
                    {errors.fullName && <span className="field__error">{errors.fullName}</span>}
                  </div>

                  <div className={`field${errors.studentId ? " field--error" : ""}`}>
                    <label htmlFor="studentId">Student ID <span>*</span></label>
                    <input
                      id="studentId"
                      value={form.studentId}
                      onChange={(event) => set("studentId")(event.target.value)}
                      placeholder="10874562"
                      autoComplete="off"
                    />
                    {errors.studentId && <span className="field__error">{errors.studentId}</span>}
                  </div>

                  <div className={`field${errors.email ? " field--error" : ""}`}>
                    <label htmlFor="email">Email <span>*</span></label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) => set("email")(event.target.value)}
                      placeholder="ama@ug.edu.gh"
                      autoComplete="email"
                    />
                    {errors.email && <span className="field__error">{errors.email}</span>}
                  </div>

                  <div className={`field${errors.phone ? " field--error" : ""}`}>
                    <label htmlFor="phone">Phone / WhatsApp <span>*</span></label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(event) => set("phone")(event.target.value)}
                      placeholder="024 000 0000"
                      autoComplete="tel"
                    />
                    {errors.phone && <span className="field__error">{errors.phone}</span>}
                  </div>

                  <div className={`field${errors.institution ? " field--error" : ""}`}>
                    <label htmlFor="institution">Institution <span>*</span></label>
                    <select
                      id="institution"
                      value={form.institution}
                      onChange={(event) => set("institution")(event.target.value)}
                    >
                      <option value="">Select your institution</option>
                      {INSTITUTIONS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors.institution && (
                      <span className="field__error">{errors.institution}</span>
                    )}
                  </div>

                  <div className={`field${errors.level ? " field--error" : ""}`}>
                    <label htmlFor="level">Level <span>*</span></label>
                    <select
                      id="level"
                      value={form.level}
                      onChange={(event) => set("level")(event.target.value)}
                    >
                      <option value="">Select your level</option>
                      {LEVELS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors.level && <span className="field__error">{errors.level}</span>}
                  </div>

                  <div className={`field field--full${errors.programme ? " field--error" : ""}`}>
                    <label htmlFor="programme">Programme <span>*</span></label>
                    <input
                      id="programme"
                      value={form.programme}
                      onChange={(event) => set("programme")(event.target.value)}
                      placeholder="BSc. Nursing"
                    />
                    {errors.programme && <span className="field__error">{errors.programme}</span>}
                  </div>

                  <div className="field field--full">
                    <label>Gender</label>
                    <div className="seg" role="group" aria-label="Gender">
                      {["Female", "Male", "Prefer not to say"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={form.gender === option}
                          onClick={() => set("gender")(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {errors.gender && <span className="field__error">{errors.gender}</span>}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="form-grid">
                  <div className={`field field--full${errors.bed ? " field--error" : ""}`}>
                    <label>Bed preference <span>*</span></label>
                    <div className={`bed-picker${openBeds.length === 1 ? " bed-picker--single" : ""}`}>
                      {room.beds.map((bed) => {
                        const isOpen = openBeds.includes(bed);
                        return (
                          <button
                            key={bed}
                            type="button"
                            className={`bed-option${form.bed === bed ? " bed-option--active" : ""}`}
                            disabled={!isOpen}
                            onClick={() => set("bed")(bed)}
                          >
                            {bed}
                            {!isOpen ? " · taken" : ""}
                          </button>
                        );
                      })}
                    </div>
                    {errors.bed && <span className="field__error">{errors.bed}</span>}
                  </div>

                  <div className={`field${errors.checkIn ? " field--error" : ""}`}>
                    <label htmlFor="checkIn">Check-in date <span>*</span></label>
                    <input
                      id="checkIn"
                      type="date"
                      value={form.checkIn}
                      min={today()}
                      onChange={(event) => set("checkIn")(event.target.value)}
                    />
                    {errors.checkIn && <span className="field__error">{errors.checkIn}</span>}
                  </div>

                  <div className="field field--full">
                    <label>Length of stay</label>
                    <div
                      className="seg"
                      role="group"
                      aria-label="Length of stay"
                      style={{ gridAutoFlow: "unset", gridTemplateColumns: `repeat(${durations.length}, minmax(0, 1fr))` }}
                    >
                      {durations.map((option) => (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={form.duration === option}
                          onClick={() => set("duration")(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {room.nightlyRate !== null && form.duration !== "Short let" && (
                      <span className="field__hint">
                        Short lets from {formatCedis(room.nightlyRate)} a night, minimum{" "}
                        {room.minNights} nights.
                      </span>
                    )}
                  </div>

                  {form.duration === "Short let" && room.nightlyRate !== null && (
                    <div className={`field field--full${errors.nights ? " field--error" : ""}`}>
                      <label htmlFor="nights">Number of nights <span>*</span></label>
                      <input
                        id="nights"
                        type="number"
                        min={room.minNights}
                        inputMode="numeric"
                        value={form.nights}
                        onChange={(event) => set("nights")(event.target.value)}
                      />
                      {errors.nights ? (
                        <span className="field__error">{errors.nights}</span>
                      ) : (
                        <span className="field__hint">
                          {formatCedis(room.nightlyRate)} per night · minimum {room.minNights} nights
                        </span>
                      )}
                    </div>
                  )}

                  <div className={`field${errors.guardianName ? " field--error" : ""}`}>
                    <label htmlFor="guardianName">Parent / guardian <span>*</span></label>
                    <input
                      id="guardianName"
                      value={form.guardianName}
                      onChange={(event) => set("guardianName")(event.target.value)}
                      placeholder="Kofi Boateng"
                    />
                    {errors.guardianName && (
                      <span className="field__error">{errors.guardianName}</span>
                    )}
                  </div>

                  <div className={`field${errors.guardianPhone ? " field--error" : ""}`}>
                    <label htmlFor="guardianPhone">Guardian phone <span>*</span></label>
                    <input
                      id="guardianPhone"
                      type="tel"
                      value={form.guardianPhone}
                      onChange={(event) => set("guardianPhone")(event.target.value)}
                      placeholder="020 000 0000"
                    />
                    {errors.guardianPhone && (
                      <span className="field__error">{errors.guardianPhone}</span>
                    )}
                  </div>

                  <div className={`field${errors.emergencyName ? " field--error" : ""}`}>
                    <label htmlFor="emergencyName">Emergency contact <span>*</span></label>
                    <input
                      id="emergencyName"
                      value={form.emergencyName}
                      onChange={(event) => set("emergencyName")(event.target.value)}
                      placeholder="Adjoa Mensah"
                    />
                    {errors.emergencyName && (
                      <span className="field__error">{errors.emergencyName}</span>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="emergencyRelationship">Relationship</label>
                    <select
                      id="emergencyRelationship"
                      value={form.emergencyRelationship}
                      onChange={(event) => set("emergencyRelationship")(event.target.value)}
                    >
                      {RELATIONSHIPS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field field--full">
                    <label htmlFor="roommate">Roommate preference (optional)</label>
                    <input
                      id="roommate"
                      value={form.roommate}
                      onChange={(event) => set("roommate")(event.target.value)}
                      placeholder="Name or student ID of someone applying with you"
                    />
                    <span className="field__hint">We try to honour these when both applications arrive together.</span>
                  </div>

                  <div className="field field--full">
                    <label htmlFor="notes">Anything else we should know? (optional)</label>
                    <textarea
                      id="notes"
                      value={form.notes}
                      onChange={(event) => set("notes")(event.target.value)}
                      placeholder="Accessibility needs, dietary arrangements, late arrival…"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <>
                  <div className="review">
                    <div className="review__head">
                      Student
                      <button type="button" onClick={() => setStep(0)}>
                        Edit
                      </button>
                    </div>
                    <div className="review__grid">
                      <div className="review__item">
                        <span>Full name</span>
                        <b>{form.fullName || "Not set"}</b>
                      </div>
                      <div className="review__item">
                        <span>Student ID</span>
                        <b>{form.studentId || "Not set"}</b>
                      </div>
                      <div className="review__item">
                        <span>Email</span>
                        <b>{form.email || "Not set"}</b>
                      </div>
                      <div className="review__item">
                        <span>Phone</span>
                        <b>{form.phone || "Not set"}</b>
                      </div>
                      <div className="review__item">
                        <span>Institution</span>
                        <b>{form.institution || "Not set"}</b>
                      </div>
                      <div className="review__item">
                        <span>Level · Programme</span>
                        <b>
                          {form.level || "Not set"}
                          {form.programme ? ` · ${form.programme}` : ""}
                        </b>
                      </div>
                    </div>
                  </div>

                  <div className="review">
                    <div className="review__head">
                      Stay
                      <button type="button" onClick={() => setStep(1)}>
                        Edit
                      </button>
                    </div>
                    <div className="review__grid">
                      <div className="review__item">
                        <span>Room · Bed</span>
                        <b>
                          {room.id} · {form.bed || "Not set"}
                        </b>
                      </div>
                      <div className="review__item">
                        <span>Check-in</span>
                        <b>{prettyDate(form.checkIn)}</b>
                      </div>
                      <div className="review__item">
                        <span>Length of stay</span>
                        <b>
                          {form.duration}
                          {form.duration === "Short let" ? ` (${form.nights} nights)` : ""}
                        </b>
                      </div>
                      <div className="review__item">
                        <span>First payment estimate</span>
                        <b>{formatCedis(firstPayment)}</b>
                      </div>
                      <div className="review__item">
                        <span>Guardian</span>
                        <b>
                          {form.guardianName || "Not set"} · {form.guardianPhone || "Not set"}
                        </b>
                      </div>
                      <div className="review__item">
                        <span>Emergency contact</span>
                        <b>
                          {form.emergencyName || "Not set"} ({form.emergencyRelationship})
                        </b>
                      </div>
                    </div>
                  </div>

                  <label className="declare">
                    <input
                      type="checkbox"
                      checked={declared}
                      onChange={(event) => {
                        setDeclared(event.target.checked);
                        setErrors({});
                      }}
                    />
                    <span>
                      I confirm the details above are accurate, and I accept Franko Hostels’
                      residence rules, quiet hours and visitor policy. I understand a bed is
                      only reserved once payment is confirmed.
                    </span>
                  </label>
                  {errors.declared && (
                    <span className="field__error" style={{ display: "block", marginBottom: 12 }}>
                      {errors.declared}
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="modal__foot">
              {step === 0 ? (
                <span className="modal__foot-note">
                  Step 1 of 3 · takes about two minutes
                </span>
              ) : (
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStep(step - 1)}>
                  <ArrowLeft size={14} className="btn__icon" />
                  Back
                </button>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
                <span className="modal__foot-note" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <ShieldIcon size={13} /> Details stay private
                </span>
                {step < 2 ? (
                  <button type="button" className="btn btn--primary" onClick={goNext}>
                    Continue
                    <ArrowRight size={15} className="btn__arrow" />
                  </button>
                ) : (
                  <button type="button" className="btn btn--primary" onClick={submit}>
                    <CheckIcon size={14} className="btn__icon" />
                    Submit application
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
