import Image from "next/image";
import Link from "next/link";
import { locations } from "@/lib/locations";
import { openBeds, rooms } from "@/lib/rooms";
import { ArrowRight, ClockIcon } from "./icons";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__banner">
        <Image
          src="/images/hero.jpg"
          alt="The Franko Hostels courtyard house, two floors of balconied rooms above the lawn"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <span className="hero__shade" aria-hidden="true" />

        <div className="shell hero__content">
          <span className="eyebrow">Accra · {locations.length} locations · 2026 / 27</span>
          <h1 className="hero__title">
            Rooms across Accra.
            <br />
            From one night to <em>one semester.</em>
          </h1>
          <p className="hero__lede">
            Numbered rooms in {locations.length} neighbourhoods, female and male houses, and
            short lets for attachments and vacation courses. Pick a location, pick a bed,
            apply in two minutes.
          </p>

          <div className="hero__actions">
            <Link href="#rooms" className="btn btn--primary">
              Find a room
              <ArrowRight size={15} className="btn__arrow" />
            </Link>
            <Link href="#rooms" className="btn btn--ghost">
              <ClockIcon size={15} className="btn__icon" />
              Short lets
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
