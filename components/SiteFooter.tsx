import Link from "next/link";
import { MailIcon, PhoneIcon } from "./icons";

export default function SiteFooter() {
  return (
    <footer className="footer" id="contact">
      <div className="shell">
        <div className="footer__top">
          <Link href="/" className="footer__brand" aria-label="Franko Hostels home">
            <span className="brand__mark">FH</span>
            <span>
              <span className="brand__name">Franko Hostels</span>
              <span className="brand__tag">Accra · Est. 2016</span>
            </span>
          </Link>

          <nav className="footer__links" aria-label="Footer">
            <Link href="/#rooms">Rooms</Link>
            <Link href="/#how">How it works</Link>
            <Link href="/account">My account</Link>
            <Link href="/policies">Policies</Link>
            <Link href="/terms">Terms</Link>
            <a href="mailto:stay@frankohostels.com">Contact</a>
          </nav>

          <div className="footer__reach">
            <a href="tel:+233240000000">
              <PhoneIcon size={12} /> +233 24 000 0000
            </a>
            <a href="mailto:stay@frankohostels.com">
              <MailIcon size={12} /> stay@frankohostels.com
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Franko Hostels, Accra</span>
          <span>Front desk: Mon to Sat, 8:00 to 18:00 GMT</span>
        </div>
      </div>
    </footer>
  );
}
