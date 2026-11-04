import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Terms and conditions | Franko Hostels",
  description:
    "How Franko Hostels applications, semester bookings, short lets, payments, cancellations and refunds work.",
};

const sections = [
  {
    id: "agreement",
    title: "The agreement",
    body: [
      "These terms govern your use of this website, your Franko account and any bed you book with us. By creating an account or submitting an application you accept them.",
      "A booking exists only when a residence officer confirms your bed by phone or email and you have paid the amount due. An application on its own does not reserve a bed.",
      "Where these terms and the residence policy differ, the residence policy governs how the house is run and these terms govern money.",
    ],
  },
  {
    id: "account",
    title: "Your account",
    body: [
      "You need one account to apply. Keep your password private and tell us immediately if you think someone else has used it.",
      "The name, email and phone number on the account must be yours. Applications submitted under another person's details are cancelled without refund.",
      "You can update your details from the account page at any time. Your applications remain attached to the account that submitted them.",
    ],
  },
  {
    id: "applications",
    title: "Applications and offers",
    body: [
      "Applications are free and take about two minutes. Submitting one does not create a contract.",
      "We review applications in the order we receive them and reply within 48 hours during working days.",
      "A bed is held for 5 days after an offer. If payment is not made in that window the bed returns to the open pool.",
      "We may decline an application where the room's gender policy does not match the applicant, where the details cannot be verified, or where a previous stay was ended for a conduct breach.",
    ],
  },
  {
    id: "fees",
    title: "Fees and payment",
    body: [
      "Semester rates are quoted per bed, per semester, and include utilities, Wi-Fi and the shared kitchenette. Air-conditioned rooms are marked as such.",
      "Short lets are quoted per night, with a minimum number of nights shown on the room page. The minimum is 2 nights in most houses and 3 nights at Spintex and Haatso.",
      "Payments are made by bank transfer, mobile money or card at the front desk. We do not accept cash for semester fees.",
      "A refundable caution deposit of GHS 500 is payable at check-in and returned within 14 days of check-out after inspection.",
      "Rates are reviewed each academic year and the rate shown on your application is the rate you pay for that stay.",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation and refunds",
    body: [
      "Cancel before check-in and your semester fee is refunded in full, less any transfer charges.",
      "Cancel within 7 days of check-in and 70 percent of the semester fee is refunded.",
      "Cancel after check-in and the semester fee is not refundable. The caution deposit is returned after inspection.",
      "Short lets cancelled at least 48 hours before the first night are refunded in full. Inside 48 hours, the first night is retained.",
      "If we cancel your stay for any reason of ours, you receive a full refund plus help finding a bed another Franko house.",
    ],
  },
  {
    id: "stay",
    title: "During your stay",
    body: [
      "You are responsible for the room, its fittings and your key for the length of your stay.",
      "Beds are personal. Subletting, swapping beds or sharing a bed is a breach of these terms and ends the booking.",
      "You agree to follow the residence policy, including quiet hours, visitor limits and the ban on cooking in rooms.",
      "We may enter a room for repairs, inspections or in an emergency, and we give at least 24 hours notice except in an emergency.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    body: [
      "We keep the buildings insured, maintain the fire alarms and staff the gate around the clock. We are not liable for loss of personal items, including theft from an unlocked room.",
      "Lock your door and use the locker provided. Report a theft to the front desk and to the police the same day.",
      "Our liability for any claim is limited to the fees you paid for the stay in question.",
      "Nothing here limits liability for death or personal injury caused by our negligence.",
    ],
  },
  {
    id: "privacy",
    title: "Your data",
    body: [
      "We collect the details you give us: name, email, phone, student ID, institution, guardian and emergency contact, and your application history.",
      "We use them to process your application, to contact you about your bed and to meet our duty of care. We do not sell your data.",
      "Emergency contact details are shared only with the residence team and used only if something happens to you.",
      "Ask us to delete your account at stay@frankohostels.com and we remove your details, keeping only the records we must keep for accounting.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      "We update these terms when fees, houses or rules change. The date at the top of this page is the date of the current version.",
      "Changes do not apply to a stay already confirmed and paid for.",
      "These terms are governed by the laws of the Republic of Ghana. Disputes are heard in the courts of Accra.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal">
        <div className="shell">
          <div className="legal__head">
            <span className="eyebrow">Terms and conditions</span>
            <h1 className="legal__title">How booking a bed with us works.</h1>
            <p className="legal__lede">
              The short version: applications are free, a bed is yours once we confirm it and
              you have paid, and cancelling early costs less than cancelling late.
            </p>
            <p className="legal__meta">Last updated 4 November 2026 · Franko Hostels, Accra</p>
          </div>

          <div className="legal__layout">
            <nav className="legal__index" aria-label="Terms sections">
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
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

              <div className="legal__callout">
                <div>
                  <h3>Need it in writing?</h3>
                  <p>
                    Email stay@frankohostels.com or call +233 24 000 0000 and ask for the
                    residence manager. We answer within 5 working days.
                  </p>
                </div>
                <Link href="/policies" className="btn btn--ghost btn--sm">
                  Residence policy
                  <ArrowRight size={14} className="btn__arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
