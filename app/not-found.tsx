import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { ArrowRight } from "@/components/icons";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="shell" style={{ padding: "120px 28px 140px", textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Room not found
          </span>
          <h1
            className="display"
            style={{ fontSize: "clamp(38px, 6vw, 62px)", letterSpacing: "-0.03em", margin: "20px 0 14px" }}
          >
            That room ID isn’t on our books.
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: "44ch", margin: "0 auto 30px", lineHeight: 1.7 }}>
            Room IDs look like FH-A101 or FH-B207. Browse everything currently available and
            pick the one that fits.
          </p>
          <Link href="/#rooms" className="btn btn--primary">
            Browse available rooms
            <ArrowRight size={15} className="btn__arrow" />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
