import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyPanel from "@/components/ApplyPanel";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  ArrowLeft,
  CheckIcon,
  PinIcon,
  RoomPlan,
  ShowerIcon,
  SunIcon,
  UserIcon,
} from "@/components/icons";
import {
  bedsAvailable,
  capacityLabel,
  formatCedis,
  getRoom,
  policyLabel,
  rooms,
} from "@/lib/rooms";
import { getLocation } from "@/lib/locations";

type Params = { params: { id: string } };

export function generateStaticParams() {
  return rooms.map((room) => ({ id: room.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const room = getRoom(params.id);
  if (!room) return { title: "Room not found | Franko Hostels" };
  const location = getLocation(room.locationId);
  return {
    title: `${room.id}: ${capacityLabel(room.capacity)} room in ${location.name} | Franko Hostels`,
    description: `${room.blurb} ${formatCedis(room.pricePerSemester)} per semester.`,
  };
}

const houseRules = [
  "Quiet hours from 22:00 to 06:00 on weekdays, 23:00 on weekends.",
  "Visitors sign in at the front desk and leave by 20:00.",
  "Cooking stays in the kitchenette. Kettles and hot plates are not allowed in rooms.",
  "Damaged fittings are repaired at cost, deducted from the refundable caution deposit.",
];

export default function RoomPage({ params }: Params) {
  const room = getRoom(params.id);
  if (!room) notFound();

  const location = getLocation(room.locationId);
  const open = bedsAvailable(room);
  const nearby = rooms
    .filter((item) => item.id !== room.id && item.locationId === room.locationId)
    .slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="detail">
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/#rooms">Rooms</Link>
            <span>/</span>
            <Link href="/#rooms">{location.name}</Link>
            <span>/</span>
            <span className="crumbs__current">{room.id}</span>
          </nav>

          <div className="detail__head">
            <div>
              <span className="eyebrow">
                {location.hostel} · {room.block} · Floor {room.floor}
              </span>
              <h1 className="detail__title">{room.id}</h1>
              <div className="detail__tags">
                <span className="tag">
                  <UserIcon size={12} /> {capacityLabel(room.capacity)} · {room.capacity}{" "}
                  occupant{room.capacity === 1 ? "" : "s"}
                </span>
                <span className="tag">{policyLabel(room.policy)}</span>
                <span className="tag">
                  <ShowerIcon size={12} /> {room.bath} bathroom
                </span>
                <span className="tag">
                  <SunIcon size={12} /> {room.view} view
                </span>
                <span className={open > 0 ? "tag tag--red" : "tag tag--muted"}>
                  {open > 0 ? `${open} bed${open === 1 ? "" : "s"} open` : "Fully occupied"}
                </span>
                {room.nightlyRate !== null && (
                  <span className="tag tag--line">Short let from {formatCedis(room.nightlyRate)}</span>
                )}
              </div>
            </div>

            <Link href="/#rooms" className="btn btn--ghost btn--sm">
              <ArrowLeft size={14} className="btn__icon" />
              All rooms
            </Link>
          </div>

          <div className="gallery">
            <div className="gallery__main">
              <Image
                src={room.photos[0]}
                alt={`${room.id}: ${capacityLabel(room.capacity)} room, ${room.bath.toLowerCase()} bathroom, ${room.view.toLowerCase()} view`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 760px"
                style={{ objectFit: "cover" }}
              />
              <span className="gallery__tag">
                {location.name} · {room.block}
              </span>
            </div>
            <div className="gallery__side">
              {room.photos.slice(1, 3).map((photo, index) => (
                <div className="gallery__thumb" key={photo}>
                  <Image
                    src={photo}
                    alt={
                      index === 0
                        ? `Bathroom serving ${room.id}`
                        : `Shared spaces near ${room.id} at ${location.hostel}`
                    }
                    fill
                    sizes="(max-width: 1024px) 50vw, 300px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="detail__layout">
            <div>
              <section className="detail__block">
                <h3>About this room</h3>
                <p className="detail__lede">{room.blurb}</p>
                <p className="detail__body">
                  {room.id} is a {capacityLabel(room.capacity).toLowerCase()} room on floor{" "}
                  {room.floor} of {room.block} in {location.hostel}, holding {room.capacity}{" "}
                  occupant{room.capacity === 1 ? "" : "s"} with{" "}
                  {room.bath === "En-suite" ? "an en-suite" : `a ${room.bath.toLowerCase()}`}{" "}
                  bathroom arrangement and a {room.view.toLowerCase()} outlook. The house is{" "}
                  {location.commute} from {location.landmark}. Every bed comes with its own
                  desk position, reading light and lockable storage.
                </p>
              </section>

              <section className="detail__block">
                <h3>Bed layout</h3>
                <div className="blueprint">
                  <div className="blueprint__caption">
                    <span>
                      {room.id} · {room.capacity} bed plan
                    </span>
                    <span>
                      {room.bedsTaken} taken · {open} open
                    </span>
                  </div>
                  <RoomPlan
                    capacity={room.capacity}
                    taken={room.bedsTaken}
                    labels={room.beds}
                  />
                </div>
              </section>

              <section className="detail__block">
                <h3>Room specification</h3>
                <div className="spec-grid">
                  <div className="spec">
                    <span>Room ID</span>
                    <b>{room.id}</b>
                  </div>
                  <div className="spec">
                    <span>Capacity</span>
                    <b>
                      {room.capacity} occupant{room.capacity === 1 ? "" : "s"} ·{" "}
                      {capacityLabel(room.capacity)}
                    </b>
                  </div>
                  <div className="spec">
                    <span>Bathroom</span>
                    <b>{room.bath}</b>
                  </div>
                  <div className="spec">
                    <span>House · Floor</span>
                    <b>
                      {room.block} · {room.floor}
                    </b>
                  </div>
                  <div className="spec">
                    <span>Policy</span>
                    <b>{policyLabel(room.policy)}</b>
                  </div>
                  <div className="spec">
                    <span>Semester rate</span>
                    <b>{formatCedis(room.pricePerSemester)}</b>
                  </div>
                  <div className="spec">
                    <span>Short let</span>
                    <b>
                      {room.nightlyRate !== null
                        ? `${formatCedis(room.nightlyRate)} / night`
                        : "Semester only"}
                    </b>
                  </div>
                  <div className="spec">
                    <span>Beds open</span>
                    <b>
                      {open} of {room.capacity}
                    </b>
                  </div>
                </div>
              </section>

              <section className="detail__block">
                <h3>What comes with the room</h3>
                <ul className="detail-amenities">
                  {room.amenities.map((amenity) => (
                    <li key={amenity}>
                      <span className="check">
                        <CheckIcon size={10} />
                      </span>
                      {amenity}
                    </li>
                  ))}
                  <li>
                    <span className="check">
                      <CheckIcon size={10} />
                    </span>
                    Borehole water backup
                  </li>
                  <li>
                    <span className="check">
                      <CheckIcon size={10} />
                    </span>
                    24-hour gate security
                  </li>
                </ul>
              </section>

              <section className="detail__block">
                <h3>The location</h3>
                <div className="loc-detail">
                  <div className="loc-detail__media">
                    <Image
                      src={location.photo}
                      alt={`${location.hostel} in ${location.name}`}
                      fill
                      sizes="(max-width: 720px) 100vw, 300px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="loc-detail__body">
                    <h4>{location.hostel}</h4>
                    <p>{location.blurb}</p>
                    <ul>
                      <li>
                        <PinIcon size={13} /> {location.address}
                      </li>
                      <li>
                        <SunIcon size={13} /> {location.commute} to {location.landmark}
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="detail__block">
                <h3>House rules</h3>
                <ul className="rules">
                  {houseRules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </section>
            </div>

            <ApplyPanel room={room} initialBed={room.beds[room.bedsTaken] ?? room.beds[0]} />
          </div>

          {nearby.length > 0 && (
            <section className="nearby">
              <div className="sec-head sec-head--tight">
                <div>
                  <span className="eyebrow">Same location</span>
                  <h2 className="sec-title sec-title--sm">Also open in {location.name}</h2>
                </div>
              </div>
              <div className="rows">
                {nearby.map((item) => (
                  <Link className="rows__item" key={item.id} href={`/rooms/${item.id}`}>
                    <div className="rows__thumb">
                      <Image
                        src={item.photos[0]}
                        alt={item.id}
                        fill
                        sizes="88px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <h4>{item.id}</h4>
                      <p>
                        {capacityLabel(item.capacity)} · {policyLabel(item.policy)} ·{" "}
                        {item.bath} bath
                      </p>
                    </div>
                    <span className={bedsAvailable(item) > 0 ? "rows__price" : "rows__price rows__price--full"}>
                      {bedsAvailable(item) > 0
                        ? `${formatCedis(item.pricePerSemester)} · ${bedsAvailable(item)} open`
                        : "Full"}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
