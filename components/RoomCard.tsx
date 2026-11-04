"use client";

import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/lib/types";
import {
  bedsAvailable,
  capacityLabel,
  formatCedis,
  isOpen,
  policyLabel,
} from "@/lib/rooms";
import { getLocation } from "@/lib/locations";
import { ArrowRight } from "./icons";

export default function RoomCard({
  room,
  onApply,
}: {
  room: Room;
  onApply: (room: Room) => void;
}) {
  const open = bedsAvailable(room);
  const available = isOpen(room);
  const location = getLocation(room.locationId);

  return (
    <article className={`card${available ? "" : " card--full"}`}>
      <div className="card__media">
        <Image
          src={room.photos[0]}
          alt={`${capacityLabel(room.capacity)} room ${room.id} at ${location.hostel}`}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 360px"
          style={{ objectFit: "cover" }}
        />
        <span className="card__place">{location.name}</span>
        {room.nightlyRate !== null && <span className="card__short">Short let</span>}

        <div className="card__actions">
          <Link className="card__btn card__btn--view" href={`/rooms/${room.id}`}>
            View details
            <ArrowRight size={12} className="card__btn-arrow" />
          </Link>
          <button
            type="button"
            className="card__btn card__btn--apply"
            onClick={() => onApply(room)}
            disabled={!available}
          >
            {available ? "Apply" : "Full"}
            {available && <ArrowRight size={12} className="card__btn-arrow" />}
          </button>
        </div>
      </div>

      <div className="card__body">
        <div className="card__row">
          <h3>
            <Link href={`/rooms/${room.id}`}>{room.id}</Link>
          </h3>
          <p className="card__price">
            {formatCedis(room.pricePerSemester)}
            <span>/semester</span>
          </p>
        </div>

        <p className="card__meta">
          {capacityLabel(room.capacity)} · {policyLabel(room.policy)} ·{" "}
          {available ? `${open} bed${open === 1 ? "" : "s"} open` : "Fully booked"}
        </p>

        <div className="card__foot">
          <div className="beds" aria-hidden="true">
            {Array.from({ length: room.capacity }).map((_, index) => (
              <span
                key={index}
                className={`beds__slot${index < room.bedsTaken ? " beds__slot--filled" : ""}`}
              />
            ))}
          </div>
          <span className="card__note">
            {available
              ? `${open} of ${room.capacity} bed${room.capacity === 1 ? "" : "s"} open`
              : "Fully booked"}
          </span>
        </div>
      </div>
    </article>
  );
}
