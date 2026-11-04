"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "./AccountProvider";
import { ArrowRight, BedIcon, UserIcon } from "./icons";

const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { user, applications, openAuth } = useAccount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div className="shell header__inner">
        <Link href="/" className="brand" aria-label="Franko Hostels home">
          <span className="brand__mark">FH</span>
          <span>
            <span className="brand__name">Franko Hostels</span>
            <span className="brand__tag">Accra · Est. 2016</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Primary">
          <Link href="/#rooms" className="nav__link">
            Rooms
          </Link>
          <Link href="/#how" className="nav__link">
            How it works
          </Link>
          <Link href="/#residence" className="nav__link">
            What is included
          </Link>
          <Link href="/policies" className="nav__link">
            Policies
          </Link>
        </nav>

        <div className="header__actions">
          {user ? (
            <Link href="/account" className="account-pill" aria-label="My account and applications">
              <span className="account-pill__avatar">{initialsOf(user.name)}</span>
              <span className="account-pill__label">{user.name.split(" ")[0]}</span>
              {applications.length > 0 && (
                <span className="account-pill__count">{applications.length}</span>
              )}
            </Link>
          ) : (
            <button type="button" className="apps-pill" onClick={() => openAuth("signin")}>
              <UserIcon size={14} />
              <span className="apps-pill__label">Sign in</span>
            </button>
          )}

          <Link href="/#rooms" className="btn btn--primary btn--sm">
            <BedIcon size={15} className="btn__icon" />
            <span>Find a room</span>
            <ArrowRight size={14} className="btn__arrow" />
          </Link>
        </div>
      </div>
    </header>
  );
}
