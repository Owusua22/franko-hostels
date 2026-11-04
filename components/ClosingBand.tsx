import Link from "next/link";
import { ArrowRight, PhoneIcon } from "./icons";

export default function ClosingBand() {
  return (
    <section className="section section--tight" style={{ paddingTop: 0 }}>
      <div className="shell">
        <div className="closing">
          <div>
            <span className="eyebrow">Applications open</span>
            <h2 className="closing__title">
              Semester beds and short lets, eight houses, one form.
            </h2>
          </div>
          <div className="closing__actions">
            <Link href="/#rooms" className="btn btn--primary">
              Find a room
              <ArrowRight size={15} className="btn__arrow" />
            </Link>
            <a href="mailto:stay@frankohostels.com" className="btn btn--ghost">
              <PhoneIcon size={15} className="btn__icon" />
              Talk to the front desk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
