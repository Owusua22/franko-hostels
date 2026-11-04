import Link from "next/link";
import {
  ArrowRight,
  BellIcon,
  ClockIcon,
  PinIcon,
  SlidersIcon,
  UserIcon,
} from "./icons";

const steps = [
  {
    icon: <PinIcon size={20} />,
    tag: "Step 01",
    meta: "8 min to choose",
    title: "Pick a neighbourhood",
    body: "East Legon, Madina, Haatso, Achimota, Adenta, Spintex, Sowutuom or Tema. Each house is one trotro ride from a campus gate.",
  },
  {
    icon: <SlidersIcon size={20} />,
    tag: "Step 02",
    meta: "Filter as you tap",
    title: "Set the room and the stay",
    body: "Female or male house, single, twin or quad, a semester or a short let. The list and the price update the moment you tap.",
  },
  {
    icon: <UserIcon size={20} />,
    tag: "Step 03",
    meta: "About 2 minutes",
    title: "Apply from your account",
    body: "Name, school, phone, move-in date. Create an account once, then apply and follow every application from one page.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section section--tight" id="how">
      <div className="shell">
        <div className="process">
          <div className="process__head">
            <div className="process__intro">
              <span className="eyebrow">The process</span>
              <h2 className="process__title">
                Simple Application <em>Process</em>
              </h2>
              <p className="process__lede">
                No agents, no queueing in a hot office. The whole thing runs on this page,
                from the first filter to the call that confirms your bed.
              </p>
            </div>

            <div className="process__cta">
              <Link href="#rooms" className="btn btn--primary">
                <PinIcon size={15} className="btn__icon" />
                Start an application
                <ArrowRight size={15} className="btn__arrow" />
              </Link>
              <span className="process__cta-note">
                <ClockIcon size={14} /> Beds are confirmed inside 48 hours
              </span>
            </div>
          </div>

          <ol className="flow">
            {steps.map((step) => (
              <li className="flow__step" key={step.title}>
                <div className="flow__rail" aria-hidden="true">
                  <span className="flow__dot">{step.icon}</span>
                  <span className="flow__line" />
                  <span className="flow__arrow">
                    <ArrowRight size={13} />
                  </span>
                </div>

                <div className="flow__card">
                  <div className="flow__meta">
                    <span className="flow__tag">{step.tag}</span>
                    <span className="flow__time">
                      <ClockIcon size={12} /> {step.meta}
                    </span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}

            <li className="flow__step flow__step--last">
              <div className="flow__rail" aria-hidden="true">
                <span className="flow__dot flow__dot--end">
                  <BellIcon size={20} />
                </span>
              </div>

              <div className="flow__card flow__card--end">
                <div className="flow__meta">
                  <span className="flow__tag">Done</span>
                  <span className="flow__time">
                    <ClockIcon size={12} /> 48 hrs
                  </span>
                </div>
                <h3>Your bed is confirmed</h3>
                <p>
                  A residence officer calls, then the offer letter and payment details land
                  in your inbox. Keys follow on the day you move.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
