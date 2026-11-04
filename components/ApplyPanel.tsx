"use client";

import { useState } from "react";
import type { Room } from "@/lib/types";
import { bedsAvailable, formatCedis, isOpen } from "@/lib/rooms";
import ApplyModal from "./ApplyModal";
import { useAccount } from "./AccountProvider";
import { ArrowRight, ShieldIcon } from "./icons";

export default function ApplyPanel({
  room,
  initialBed,
}: {
  room: Room;
  initialBed: string;
}) {
  const { requireAccount } = useAccount();
  const openBeds = room.beds.slice(room.bedsTaken);
  const [bed, setBed] = useState(
    openBeds.includes(initialBed) ? initialBed : openBeds[0] ?? room.beds[0],
  );
  const [stay, setStay] = useState<"semester" | "short">("semester");
  const [nights, setNights] = useState(Math.max(room.minNights, 2));
  const [modal, setModal] = useState(false);
  const available = isOpen(room);
  const shortLet = room.nightlyRate !== null;

  const total =
    stay === "short" && room.nightlyRate ? room.nightlyRate * nights : room.pricePerSemester;

  return (
    <>
      <aside className="book" id="apply">
        <div className="book__top">
          <div className="book__price">
            <b>
              {stay === "short" && room.nightlyRate
                ? formatCedis(room.nightlyRate)
                : formatCedis(room.pricePerSemester)}
            </b>
            <span>{stay === "short" ? "/ night" : "/ semester"}</span>
          </div>
          <p className="book__note">
            {available
              ? room.capacity === 1
                ? "The bed is still open. Application is free"
                : `${bedsAvailable(room)} of ${room.capacity} beds still open · application is free`
              : "Fully occupied. Join the waitlist by writing to the front desk"}
          </p>
        </div>

        <div className="book__body">
          {shortLet && (
            <div>
              <span className="field-label">Length of stay</span>
              <div className="seg" role="group" aria-label="Length of stay">
                <button
                  type="button"
                  aria-pressed={stay === "semester"}
                  onClick={() => setStay("semester")}
                >
                  Semester
                </button>
                <button
                  type="button"
                  aria-pressed={stay === "short"}
                  onClick={() => setStay("short")}
                >
                  Short let
                </button>
              </div>
            </div>
          )}

          {shortLet && stay === "short" && (
            <div>
              <span className="field-label">Nights</span>
              <div className="stepper">
                <button
                  type="button"
                  aria-label="Fewer nights"
                  onClick={() => setNights((value) => Math.max(room.minNights, value - 1))}
                  disabled={nights <= room.minNights}
                >
                  −
                </button>
                <span>
                  {nights} night{nights === 1 ? "" : "s"}
                </span>
                <button
                  type="button"
                  aria-label="More nights"
                  onClick={() => setNights((value) => value + 1)}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div>
            <span className="field-label">Choose your bed</span>
            <div className={`bed-picker${room.beds.length === 1 ? " bed-picker--single" : ""}`}>
              {room.beds.map((option, index) => {
                const taken = index < room.bedsTaken;
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={taken}
                    className={`bed-option${bed === option ? " bed-option--active" : ""}`}
                    onClick={() => setBed(option)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="book__rows">
            <div className="book__row">
              <span>Selected</span>
              <b>{bed}</b>
            </div>
            <div className="book__row">
              <span>{stay === "short" ? "Nightly rate" : "Semester rate"}</span>
              <b>
                {stay === "short" && room.nightlyRate
                  ? formatCedis(room.nightlyRate)
                  : formatCedis(room.pricePerSemester)}
              </b>
            </div>
            <div className="book__row">
              <span>
                <ShieldIcon size={13} /> Application fee
              </span>
              <b>Free</b>
            </div>
            <div className="book__row book__row--total">
              <span>{stay === "short" ? `Estimated for ${nights} nights` : "First payment"}</span>
              <b>{formatCedis(total)}</b>
            </div>
          </div>

          <button
            type="button"
            className="btn btn--primary btn--block"
            disabled={!available}
            onClick={() => requireAccount(() => setModal(true))}
          >
            {available ? "Apply for this room" : "Fully occupied"}
            {available && <ArrowRight size={15} className="btn__arrow" />}
          </button>
          <p className="book__fine">
            No card needed. A residence officer confirms your bed by phone before any payment
            is requested.
          </p>
        </div>
      </aside>

      <div className="mobile-apply">
        <div>
          <b>{formatCedis(total)}</b>
          <span>{stay === "short" ? ` / ${nights} nights` : " / semester"}</span>
          <p>
            {available
              ? `${bedsAvailable(room)} bed${bedsAvailable(room) === 1 ? "" : "s"} open · ${bed}`
              : "Fully occupied"}
          </p>
        </div>
        <button
          type="button"
          className="btn btn--primary btn--sm"
          disabled={!available}
          onClick={() => requireAccount(() => setModal(true))}
        >
          {available ? "Apply" : "Full"}
          {available && <ArrowRight size={13} className="btn__arrow" />}
        </button>
      </div>

      {modal && (
        <ApplyModal
          room={room}
          initialBed={bed}
          initialStay={stay}
          initialNights={nights}
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
}
