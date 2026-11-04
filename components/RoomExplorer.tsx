"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { Capacity, Policy, Room } from "@/lib/types";
import { bedsAvailable, rooms } from "@/lib/rooms";
import { locations } from "@/lib/locations";
import ApplyModal from "./ApplyModal";
import { useAccount } from "./AccountProvider";
import RoomCard from "./RoomCard";
import { ArrowLeft, ArrowRight, CloseIcon, SearchIcon } from "./icons";

type Stay = "any" | "semester" | "short";
type Sort = "recommended" | "price-low" | "price-high" | "open";

const POLICIES: { key: "any" | Policy; label: string }[] = [
  { key: "any", label: "Everyone" },
  { key: "Female", label: "Female" },
  { key: "Male", label: "Male" },
];

const CAPACITIES: { key: "any" | Capacity; label: string }[] = [
  { key: "any", label: "Any size" },
  { key: 1, label: "Single" },
  { key: 2, label: "Twin" },
  { key: 4, label: "Quad" },
];

const STAYS: { key: Stay; label: string }[] = [
  { key: "any", label: "Any" },
  { key: "semester", label: "Semester" },
  { key: "short", label: "Short let" },
];

const bedsIn = (locationId: string) =>
  rooms
    .filter((room) => room.locationId === locationId)
    .reduce((sum, room) => sum + bedsAvailable(room), 0);


export default function RoomExplorer() {
  const [location, setLocation] = useState<string>("all");
  const [policy, setPolicy] = useState<"any" | Policy>("any");
  const [capacity, setCapacity] = useState<"any" | Capacity>("any");
  const [stay, setStay] = useState<Stay>("any");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("recommended");
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const { requireAccount } = useAccount();
  const [page, setPage] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = rooms.filter((room) => {
      if (location !== "all" && room.locationId !== location) return false;
      if (policy !== "any" && room.policy !== policy) return false;
      if (capacity !== "any" && room.capacity !== capacity) return false;
      if (stay === "short" && room.nightlyRate === null) return false;
      if (!needle) return true;
      const loc = locations.find((item) => item.id === room.locationId);
      return (
        room.id.toLowerCase().includes(needle) ||
        room.block.toLowerCase().includes(needle) ||
        (loc ? `${loc.name} ${loc.hostel} ${loc.address} ${loc.landmark}`.toLowerCase().includes(needle) : false) ||
        room.amenities.some((amenity) => amenity.toLowerCase().includes(needle))
      );
    });

    const sorted = [...list];
    if (sort === "price-low") sorted.sort((a, b) => a.pricePerSemester - b.pricePerSemester);
    if (sort === "price-high") sorted.sort((a, b) => b.pricePerSemester - a.pricePerSemester);
    if (sort === "open") sorted.sort((a, b) => bedsAvailable(b) - bedsAvailable(a));
    return sorted;
  }, [location, policy, capacity, stay, query, sort]);

  const openCount = filtered.reduce((sum, room) => sum + bedsAvailable(room), 0);
  const activeLocation = locations.find((item) => item.id === location);
  const filtersActive =
    location !== "all" || policy !== "any" || capacity !== "any" || stay !== "any" || query.trim() !== "";

  const PAGE = 4;
  const pageCount = Math.ceil(locations.length / PAGE);
  const visibleLocations = locations.slice(page * PAGE, page * PAGE + PAGE);

  const scrollToResults = () => {
    window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const chooseLocation = (id: string) => {
    setLocation(id);
    scrollToResults();
  };

  const reset = () => {
    setLocation("all");
    setPolicy("any");
    setCapacity("any");
    setStay("any");
    setQuery("");
  };

  return (
    <section className="section stays" id="rooms">
      <div className="shell">
        <header className="sec-head">
          <span className="eyebrow">Locations and rooms</span>
          <h2 className="sec-title">Hostels across Accra.</h2>
          <p className="sec-sub">
            Every Franko house sits within a short walk or one trotro ride of a campus.
            Choose a neighbourhood, or search by name, then take the room and stay length
            that suits you.
          </p>
        </header>

        <div className="loc-head">
          <div>
            <span className="fgroup__label">Where you can stay</span>
            <p className="loc-head__count">
              {page * PAGE + 1} to {Math.min(page * PAGE + PAGE, locations.length)} of{" "}
              {locations.length} locations
            </p>
          </div>
          <div className="loc-head__actions">
            {location !== "all" && (
              <button type="button" className="loc-clear" onClick={() => chooseLocation("all")}>
                All locations
              </button>
            )}
            <button
              type="button"
              className="loc-arrow"
              aria-label="Previous locations"
              disabled={page === 0}
              onClick={() => setPage((value) => Math.max(0, value - 1))}
            >
              <ArrowLeft size={15} />
            </button>
            <button
              type="button"
              className="loc-arrow"
              aria-label="More locations"
              disabled={page >= pageCount - 1}
              onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="loc-grid">
          {visibleLocations.map((item) => {
            const active = location === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`loc-card${active ? " loc-card--active" : ""}`}
                aria-pressed={active}
                onClick={() => chooseLocation(active ? "all" : item.id)}
              >
                <span className="loc-card__media">
                  <Image
                    src={item.photo}
                    alt={`${item.hostel} in ${item.name}`}
                    fill
                    sizes="(max-width: 720px) 50vw, 280px"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="loc-card__open">{bedsIn(item.id)} open</span>
                </span>
                <span className="loc-card__body">
                  <strong>{item.name}</strong>
                  <small>
                    {item.commute} to {item.landmark}
                  </small>
                </span>
              </button>
            );
          })}
        </div>

        <div className="filter-shell">
          <div className="filter-groups">
            <div className="fgroup">
              <span className="fgroup__label">Where</span>
              <div className="sel">
                <select
                  value={location}
                  onChange={(event) => chooseLocation(event.target.value)}
                  aria-label="Filter by location"
                >
                  <option value="all">All {locations.length} locations</option>
                  {locations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="fgroup">
              <span className="fgroup__label">For</span>
              <div className="seg seg--sm" role="group" aria-label="Filter by gender">
                {POLICIES.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    aria-pressed={policy === item.key}
                    onClick={() => setPolicy(item.key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="fgroup">
              <span className="fgroup__label">Room</span>
              <div className="seg seg--sm" role="group" aria-label="Filter by room size">
                {CAPACITIES.map((item) => (
                  <button
                    key={String(item.key)}
                    type="button"
                    aria-pressed={capacity === item.key}
                    onClick={() => setCapacity(item.key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="fgroup">
              <span className="fgroup__label">Stay</span>
              <div className="seg seg--sm" role="group" aria-label="Filter by stay length">
                {STAYS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    aria-pressed={stay === item.key}
                    onClick={() => setStay(item.key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="filter-side">
            <div className="search">
              <SearchIcon />
              <input
                type="search"
                placeholder="Search area"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search rooms and locations"
              />
            </div>
            <div className="sort">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as Sort)}
                aria-label="Sort rooms"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="open">Most beds open</option>
              </select>
            </div>
          </div>
        </div>

        <div className="results-line" ref={resultsRef}>
          <p>
            <strong>{filtered.length}</strong> room{filtered.length === 1 ? "" : "s"}
            {activeLocation ? (
              <>
                {" "}in <strong>{activeLocation.name}</strong>
              </>
            ) : (
              <> across <strong>{locations.length} locations</strong></>
            )}{" "}
            · <strong>{openCount}</strong> bed{openCount === 1 ? "" : "s"} open
          </p>
          {filtersActive && (
            <button type="button" className="clear" onClick={reset}>
              <CloseIcon size={12} /> Clear filters
            </button>
          )}
        </div>

        <div className="grid">
          {filtered.length === 0 ? (
            <div className="empty">
              <h3>No rooms match those filters</h3>
              <p>
                That combination is not open right now. Try another neighbourhood or clear
                the filters to see all {rooms.length} rooms.
              </p>
              <button type="button" className="btn btn--primary btn--sm" onClick={reset}>
                <CloseIcon size={13} className="btn__icon" />
                Clear filters
              </button>
            </div>
          ) : (
            filtered.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onApply={(selected) => requireAccount(() => setActiveRoom(selected))}
              />
            ))
          )}
        </div>
      </div>

      {activeRoom && (
        <ApplyModal
          room={activeRoom}
          initialStay={stay === "short" && activeRoom.nightlyRate ? "short" : "semester"}
          initialBed={activeRoom.beds[activeRoom.bedsTaken] ?? activeRoom.beds[0]}
          onClose={() => setActiveRoom(null)}
        />
      )}
    </section>
  );
}
