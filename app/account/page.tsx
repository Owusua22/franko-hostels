"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useAccount } from "@/components/AccountProvider";
import {
  ArrowRight,
  CalendarIcon,
  CheckIcon,
  CloseIcon,
  LogOutIcon,
  PinIcon,
  UserIcon,
} from "@/components/icons";
import { capacityLabel, formatCedis, getRoom } from "@/lib/rooms";
import { getLocation } from "@/lib/locations";
import { withdrawApplication } from "@/lib/storage";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function AccountPage() {
  const { user, applications, ready, openAuth, signOut, updateProfile } = useAccount();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  const openApplications = applications.filter((application) => {
    const room = getRoom(application.roomId);
    return Boolean(room);
  });

  return (
    <>
      <SiteHeader />
      <main className="account">
        <div className="shell">
          {!ready ? (
            <div className="account__loading" />
          ) : !user ? (
            <div className="account__guest">
              <span className="eyebrow">Your account</span>
              <h1 className="account__title">Sign in to see your applications.</h1>
              <p>
                An account keeps your applications, your bed and your check-in date in one
                place. It takes about thirty seconds to create.
              </p>
              <div className="account__guest-actions">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => openAuth("signup")}
                >
                  Create an account
                  <ArrowRight size={15} className="btn__arrow" />
                </button>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => openAuth("signin")}
                >
                  <UserIcon size={14} className="btn__icon" />
                  Sign in
                </button>
              </div>
            </div>
          ) : (
            <>
              <header className="account__head">
                <div>
                  <span className="eyebrow">Your account</span>
                  <h1 className="account__title">{user.name}</h1>
                  <p className="account__meta">
                    {user.email} · member since {formatDate(user.createdAt)}
                  </p>
                </div>
                <button type="button" className="btn btn--ghost btn--sm" onClick={signOut}>
                  <LogOutIcon size={14} className="btn__icon" />
                  Sign out
                </button>
              </header>

              <div className="account__grid">
                <aside className="account__side">
                  <div className="panel">
                    <div className="panel__head">
                      <h3>Your details</h3>
                      {!editing && (
                        <button
                          type="button"
                          className="panel__link"
                          onClick={() => {
                            setName(user.name);
                            setPhone(user.phone);
                            setEditing(true);
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </div>

                    {editing ? (
                      <form
                        className="panel__form"
                        onSubmit={async (event) => {
                          event.preventDefault();
                          await updateProfile({ name, phone });
                          setEditing(false);
                        }}
                      >
                        <div className="field">
                          <label htmlFor="accName">Full name</label>
                          <input
                            id="accName"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>
                        <div className="field">
                          <label htmlFor="accPhone">Phone / WhatsApp</label>
                          <input
                            id="accPhone"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                          />
                        </div>
                        <div className="panel__form-actions">
                          <button type="submit" className="btn btn--primary btn--sm">
                            <CheckIcon size={13} className="btn__icon" />
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn--ghost btn--sm"
                            onClick={() => setEditing(false)}
                          >
                            <CloseIcon size={13} className="btn__icon" />
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <dl className="panel__rows">
                        <div>
                          <dt>
                            <UserIcon size={13} /> Name
                          </dt>
                          <dd>{user.name}</dd>
                        </div>
                        <div>
                          <dt>Email</dt>
                          <dd>{user.email}</dd>
                        </div>
                        <div>
                          <dt>Phone</dt>
                          <dd>{user.phone || "Not added"}</dd>
                        </div>
                        <div>
                          <dt>
                            <CalendarIcon size={13} /> Joined
                          </dt>
                          <dd>{formatDate(user.createdAt)}</dd>
                        </div>
                      </dl>
                    )}
                  </div>

                  <div className="panel panel--quiet">
                    <div className="panel__head">
                      <h3>Applications</h3>
                      <span className="panel__count">{applications.length}</span>
                    </div>
                    <p className="panel__note">
                      Every application you submit is stored here. A residence officer calls
                      the number on your account within 48 hours.
                    </p>
                    <Link href="/#rooms" className="btn btn--primary btn--sm btn--block">
                      Browse rooms
                      <ArrowRight size={13} className="btn__arrow" />
                    </Link>
                  </div>
                </aside>

                <section className="account__main">
                  <div className="panel__head panel__head--main">
                    <h2>My applications</h2>
                    <span className="panel__count">{applications.length} total</span>
                  </div>

                  {openApplications.length === 0 ? (
                    <div className="panel panel--empty">
                      <h3>No applications yet</h3>
                      <p>
                        Find a room in one of the eight houses, choose your bed and apply. It
                        takes about two minutes and costs nothing.
                      </p>
                      <Link href="/#rooms" className="btn btn--primary btn--sm">
                        Find a room
                        <ArrowRight size={14} className="btn__arrow" />
                      </Link>
                    </div>
                  ) : (
                    <div className="apps-list">
                      {openApplications.map((application) => {
                        const room = getRoom(application.roomId)!;
                        const location = getLocation(room.locationId);
                        return (
                          <article className="app-card" key={application.reference}>
                            <div className="app-card__media">
                              <Image
                                src={room.photos[0]}
                                alt={`${capacityLabel(room.capacity)} room ${room.id}`}
                                fill
                                sizes="160px"
                                style={{ objectFit: "cover" }}
                              />
                            </div>

                            <div className="app-card__body">
                              <div className="app-card__top">
                                <div>
                                  <h3>
                                    {room.id} · {capacityLabel(room.capacity)}
                                  </h3>
                                  <p>
                                    {location.hostel} · {room.block}, floor {room.floor}
                                  </p>
                                </div>
                                <span className="status">Received</span>
                              </div>

                              <dl className="app-card__rows">
                                <div>
                                  <dt>Reference</dt>
                                  <dd>{application.reference}</dd>
                                </div>
                                <div>
                                  <dt>Bed</dt>
                                  <dd>{application.bedPreference || "Any"}</dd>
                                </div>
                                <div>
                                  <dt>Stay</dt>
                                  <dd>{application.duration}</dd>
                                </div>
                                <div>
                                  <dt>Check-in</dt>
                                  <dd>
                                    {new Date(`${application.checkIn}T00:00:00`).toLocaleDateString(
                                      "en-GB",
                                      { day: "numeric", month: "short", year: "numeric" },
                                    )}
                                  </dd>
                                </div>
                                <div>
                                  <dt>Rate</dt>
                                  <dd>
                                    {application.duration.startsWith("Short let") &&
                                    room.nightlyRate
                                      ? `${formatCedis(room.nightlyRate)} / night`
                                      : `${formatCedis(room.pricePerSemester)} / semester`}
                                  </dd>
                                </div>
                                <div>
                                  <dt>Submitted</dt>
                                  <dd>{formatDate(application.submittedAt)}</dd>
                                </div>
                              </dl>

                              <div className="app-card__foot">
                                <span className="app-card__hint">
                                  <CheckIcon size={11} /> With the {location.name} residence team
                                </span>
                                <div className="app-card__actions">
                                  <Link
                                    href={`/rooms/${room.id}`}
                                    className="app-card__link"
                                  >
                                    <PinIcon size={12} /> View room
                                  </Link>
                                  <button
                                    type="button"
                                    className="app-card__link app-card__link--muted"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          `Withdraw application ${application.reference}?`,
                                        )
                                      ) {
                                        withdrawApplication(application.reference);
                                      }
                                    }}
                                  >
                                    <CloseIcon size={12} /> Withdraw
                                  </button>
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </section>
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
