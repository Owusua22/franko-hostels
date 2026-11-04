import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import AccountProvider from "@/components/AccountProvider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Franko Hostels | Student rooms in Accra, by the night or the semester",
  description:
    "Numbered single, twin and quad rooms in eight Accra neighbourhoods. Female and male houses, semester rooms and short lets, with live availability and an account that tracks every application.",
  keywords: [
    "Franko Hostels",
    "student hostel Accra",
    "short let Accra",
    "female hostel Accra",
    "male hostel Accra",
    "university accommodation Ghana",
  ],
  openGraph: {
    title: "Franko Hostels | Student rooms in Accra, by the night or the semester",
    description:
      "Numbered rooms, real occupancy, and a two-minute application. Singles, twins and quads for the 2026/27 intake.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <AccountProvider>{children}</AccountProvider>
      </body>
    </html>
  );
}
