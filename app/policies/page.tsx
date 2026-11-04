import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Residence policy | Franko Hostels",
  description:
    "House rules, visitor policy, quiet hours, kitchen use, damage and deposit terms for every Franko Hostels house in Accra.",
};

const sections = [
  {
    id: "who",
    title: "Who can stay",
    items: [
      "Franko houses are for registered students and young professionals on attachment or placement in Accra.",
      "Female houses admit female occupants only, male houses admit male occupants only, and mixed houses admit any student. The policy is printed on every room page and repeated on your application.",
      "You must present a valid student ID or admission letter, plus one government ID, at check-in.",
      "Every occupant must hold their own account and their own application. One application covers one bed.",
    ],
  },
  {
    id: "checkin",
    title: "Check-in and check-out",
    items: [
      "Check-in runs from 10:00 to 19:00, Monday to Saturday. Sunday arrivals are arranged by phone at least 48 hours ahead.",
      "The first semester payment, or the full short let amount, is settled before keys are issued.",
      "Check-out is by 11:00 on the last day of your stay. Rooms are inspected with you present and the caution deposit refunded within 14 days.",
      "Beds not claimed within 5 days of the confirmed check-in date return to the open pool without refund.",
    ],
  },
  {
    id: "visitors",
    title: "Visitors and guests",
    items: [
      "Visitors sign in at the front desk with a name and phone number, and leave by 20:00.",
      "Overnight guests are not permitted. This applies to every house, including mixed houses.",
      "You are responsible for your visitor while they are on the premises, including any damage they cause.",
      "No visitor is admitted into a house of a different gender after 18:00.",
    ],
  },
  {
    id: "quiet",
    title: "Quiet hours and shared space",
    items: [
      "Quiet hours run from 22:00 to 06:00 on weekdays and from 23:00 on Fridays and Saturdays.",
      "Reading rooms stay open until midnight in exam season and are silent spaces at all times.",
      "Music, calls and video playback belong on headphones outside your room.",
      "Corridors, stairwells and the courtyard stay clear. Nothing is stored outside your door.",
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen and utilities",
    items: [
      "Cooking happens in the floor kitchenette only. Kettles, hot plates, rice cookers and microwaves are not permitted in rooms.",
      "Label your food and clean the hob and counter after each use.",
      "Water runs from the mains with a borehole backup. Report a dry tap to the front desk the same day.",
      "Power is backed up by generator and inverter. Air conditioners are permitted only in rooms that are let with one.",
    ],
  },
  {
    id: "prohibited",
    title: "What is not allowed",
    items: [
      "Smoking, vaping and shisha anywhere inside the buildings, including balconies.",
      "Alcohol in shared areas, and any quantity in female houses.",
      "Candles, incense, gas cylinders, charcoal stoves and open flames.",
      "Weapons, illegal substances, and anything that interferes with the fire alarm or CCTV.",
      "Subletting, swapping beds or handing your key to another person.",
    ],
  },
  {
    id: "damage",
    title: "Damage and deposits",
    items: [
      "A refundable caution deposit of GHS 500 is held against damage, missing items and unpaid utilities.",
      "Report damage within 24 hours. Fair wear and tear is not charged.",
      "Damage to a shared fitting is shared by the occupants of the room unless one person accepts responsibility.",
      "Lost keys are replaced at GHS 80 per set, including the gate tag.",
    ],
  },
  {
    id: "security",
    title: "Security and CCTV",
    items: [
      "One gate, one entrance, a visitor log and a night porter until 06:00. Gates close at 22:00 and open on the buzzer after that.",
      "CCTV covers the car park, the gate and the ground-floor corridors. There are no cameras inside rooms or bathrooms.",
      "Footage is kept for 30 days and reviewed only for a security incident.",
      "Report a lost key or a broken lock immediately. Do not attempt your own repair.",
    ],
  },
  {
    id: "ending",
    title: "Ending a stay",
    items: [
      "A semester booking runs for the full semester. Leaving early does not attract a refund of the semester fee.",
      "A short let runs for the nights booked. Extensions are subject to availability and paid in advance.",
      "The residence may end a stay for repeated noise, violence, theft, subletting or refusal to follow these rules after one written warning.",
      "In that case unused nights are refunded and the caution deposit is returned after inspection.",
    ],
  },
  {
    id: "complaints",
    title: "Complaints",
    items: [
      "Raise an issue with the front desk first. Most repairs are handled within 48 hours.",
      "If it is not resolved, write to stay@frankohostels.com with your room ID and reference number.",
      "We respond to every written complaint within 5 working days.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal">
        <div className="shell">
          <div className="legal__head">
            <span className="eyebrow">Residence policy</span>
            <h1 className="legal__title">House rules, in plain language.</h1>
            <p className="legal__lede">
              These rules apply in all eight Franko houses. They exist so that a room here
              stays quiet enough to study in, and safe enough to sleep in.
            </p>
            <p className="legal__meta">
              Last updated 4 November 2026 · Applies to every house and every type of stay
            </p>
          </div>

          <div className="legal__layout">
            <nav className="legal__index" aria-label="Policy sections">
              <span className="legal__index-title">On this page</span>
              {sections.map((section, index) => (
                <a key={section.id} href={`#${section.id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
            </nav>

            <div className="legal__body">
              {sections.map((section, index) => (
                <section className="legal__section" id={section.id} key={section.id}>
                  <h2>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </h2>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}

              <div className="legal__callout">
                <div>
                  <h3>Questions about a rule?</h3>
                  <p>
                    The front desk on Links Road answers from 8:00 to 18:00, Monday to
                    Saturday. Anything in writing gets a reply within 5 working days.
                  </p>
                </div>
                <Link href="/#rooms" className="btn btn--primary btn--sm">
                  Browse rooms
                  <ArrowRight size={14} className="btn__arrow" />
                </Link>
              </div>

              <p className="legal__also">
                Also read our <Link href="/terms">terms and conditions</Link> for how
                applications, payments and cancellations work.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
