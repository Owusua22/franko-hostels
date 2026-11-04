import Image from "next/image";
import { totalBeds } from "@/lib/rooms";
import { locations } from "@/lib/locations";
import {
  AcademyIcon,
  BikeIcon,
  KitchenIcon,
  LaundryIcon,
  PowerIcon,
  ShieldIcon,
  ShowerIcon,
  WifiIcon,
} from "./icons";

const amenities = [
  {
    icon: <WifiIcon />,
    title: "Fibre Wi-Fi on every floor",
    body: "100 Mbps per block with repeaters in the corridors, so the 2 a.m. submission still uploads.",
  },
  {
    icon: <PowerIcon />,
    title: "Power that doesn’t blink",
    body: "Standby generator and an inverter bank on the study lights. Outages don’t end your reading.",
  },
  {
    icon: <ShowerIcon />,
    title: "Water, heated and constant",
    body: "Borehole backup plus heaters on the shared showers. No buckets in the corridor.",
  },
  {
    icon: <ShieldIcon />,
    title: "Gated, lit, watched",
    body: "One gate, one visitor log, CCTV on the car park and a night porter on duty until 6 a.m.",
  },
  {
    icon: <KitchenIcon />,
    title: "Shared kitchenettes",
    body: "Two-burner hobs, fridges and prep counters on every floor, so you can cook like you mean to save money.",
  },
  {
    icon: <LaundryIcon />,
    title: "Laundry and drying lines",
    body: "Coin machines in Block C plus covered drying lines that survive the rainy season.",
  },
  {
    icon: <BikeIcon />,
    title: "Bike and trotro access",
    body: "Covered bike rack by the gate and a trotro stop 90 seconds down the road.",
  },
  {
    icon: <AcademyIcon />,
    title: "Study rooms, not just beds",
    body: "A 20-seat reading room with whiteboards, open until midnight during exams.",
  },
];

export default function Residence() {
  return (
    <section className="section" id="residence">
      <div className="shell">
        <div className="sec-head">
          <span className="eyebrow">In every house</span>
          <h2 className="sec-title">We provide Comfort Accross</h2>
          
        </div>

        <div className="photo-strip">
          <figure className="photo-strip__item">
            <div className="photo-strip__frame">
              <Image
                src="/images/people-study.jpg"
                alt="A student working in the Franko Hostels reading room"
                fill
                sizes="(max-width: 720px) 100vw, 380px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption>Reading rooms, open until midnight in exam season</figcaption>
          </figure>
          <figure className="photo-strip__item">
            <div className="photo-strip__frame">
              <Image
                src="/images/kitchen.jpg"
                alt="A kitchenette with hobs, fridge and prep counter"
                fill
                sizes="(max-width: 720px) 100vw, 380px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption>Kitchenettes, shared between four rooms</figcaption>
          </figure>
          <figure className="photo-strip__item">
            <div className="photo-strip__frame">
              <Image
                src="/images/courtyard.jpg"
                alt="The planted courtyard at Franko East Legon"
                fill
                sizes="(max-width: 720px) 100vw, 380px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption>The garden at Franko East Legon</figcaption>
          </figure>
        </div>

        <div className="amenity-grid">
          {amenities.map((amenity) => (
            <div className="amenity" key={amenity.title}>
              <div className="amenity__icon">{amenity.icon}</div>
              <h4>{amenity.title}</h4>
              <p>{amenity.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
