import type { Room } from "./types";
import { getLocation } from "./locations";

export const rooms: Room[] = [
  // ---------------------------------------------------------------- East Legon
  {
    id: "FH-A101",
    locationId: "east-legon",
    block: "Block A",
    floor: 1,
    capacity: 1,
    bedsTaken: 0,
    pricePerSemester: 4800,
    nightlyRate: null,
    minNights: 0,
    bath: "Private",
    policy: "Mixed",
    view: "Courtyard",
    blurb:
      "A quiet single on the ground floor, angled away from the corridor so the courtyard is yours at sunrise.",
    amenities: ["Study desk", "Reading lamp", "Wardrobe", "Ceiling fan", "Wi-Fi 100 Mbps"],
    beds: ["Single bed"],
    photos: ["/images/single-a.jpg", "/images/bath-c.jpg", "/images/garden.jpg"],
  },
  {
    id: "FH-A102",
    locationId: "east-legon",
    block: "Block A",
    floor: 1,
    capacity: 1,
    bedsTaken: 0,
    pricePerSemester: 5200,
    nightlyRate: null,
    minNights: 0,
    bath: "En-suite",
    policy: "Mixed",
    view: "Garden",
    blurb:
      "Ground-floor single with its own shower and a wide window onto the mango trees behind the house.",
    amenities: ["En-suite shower", "Study desk", "Wardrobe", "Air conditioning", "Wi-Fi 100 Mbps"],
    beds: ["Single bed"],
    photos: ["/images/single-b.jpg", "/images/bath-a.jpg", "/images/garden.jpg"],
  },
  {
    id: "FH-A203",
    locationId: "east-legon",
    block: "Block A",
    floor: 2,
    capacity: 2,
    bedsTaken: 1,
    pricePerSemester: 3600,
    nightlyRate: null,
    minNights: 0,
    bath: "Shared",
    policy: "Female",
    view: "Street",
    blurb:
      "A female-only twin with both desks facing the window. One bed is held by a third-year nursing student.",
    amenities: ["Two study desks", "Wardrobe", "Ceiling fan", "Wi-Fi 100 Mbps", "Reading lamp"],
    beds: ["Bed 1", "Bed 2"],
    photos: ["/images/twin-a.jpg", "/images/bath-b.jpg", "/images/courtyard.jpg"],
  },
  {
    id: "FH-A204",
    locationId: "east-legon",
    block: "Block A",
    floor: 2,
    capacity: 2,
    bedsTaken: 0,
    pricePerSemester: 3600,
    nightlyRate: null,
    minNights: 0,
    bath: "Shared",
    policy: "Female",
    view: "Courtyard",
    blurb:
      "Sunlit female-only twin directly above the courtyard. Both beds are free for the semester intake.",
    amenities: ["Two study desks", "Wardrobe", "Ceiling fan", "Wi-Fi 100 Mbps", "Water heater"],
    beds: ["Bed 1", "Bed 2"],
    photos: ["/images/twin-b.jpg", "/images/bath-b.jpg", "/images/courtyard.jpg"],
  },
  {
    id: "FH-B105",
    locationId: "east-legon",
    block: "Block B",
    floor: 1,
    capacity: 4,
    bedsTaken: 2,
    pricePerSemester: 2400,
    nightlyRate: null,
    minNights: 0,
    bath: "Shared",
    policy: "Mixed",
    view: "Courtyard",
    blurb:
      "Four-bed quad with a shared kitchenette down the hall. Two beds open, which suits a group applying together.",
    amenities: ["Four study desks", "Wardrobe", "Ceiling fan", "Shared kitchenette", "Wi-Fi 100 Mbps"],
    beds: ["Bunk A · lower", "Bunk A · upper", "Bunk B · lower", "Bunk B · upper"],
    photos: ["/images/quad-a.jpg", "/images/kitchen.jpg", "/images/bath-c.jpg"],
  },
  {
    id: "FH-B106",
    locationId: "east-legon",
    block: "Block B",
    floor: 1,
    capacity: 4,
    bedsTaken: 0,
    pricePerSemester: 2400,
    nightlyRate: null,
    minNights: 0,
    bath: "Shared",
    policy: "Male",
    view: "Car park",
    blurb:
      "A male-only quad, all four beds unfilled. Built-in storage under each bunk and one long shared desk run.",
    amenities: ["Four study desks", "Wardrobe", "Ceiling fan", "Shared kitchenette", "Power backup"],
    beds: ["Bunk A · lower", "Bunk A · upper", "Bunk B · lower", "Bunk B · upper"],
    photos: ["/images/quad-a.jpg", "/images/kitchen.jpg", "/images/bath-b.jpg"],
  },

  // ------------------------------------------------------------------- Madina
  {
    id: "FH-M105",
    locationId: "madina",
    block: "House 2",
    floor: 1,
    capacity: 1,
    bedsTaken: 0,
    pricePerSemester: 4200,
    nightlyRate: 190,
    minNights: 2,
    bath: "En-suite",
    policy: "Mixed",
    view: "Street",
    blurb:
      "Single with its own shower, two minutes from the Madina trotro line. Lets by the night between semesters.",
    amenities: ["En-suite shower", "Study desk", "Wardrobe", "Air conditioning", "Wi-Fi 100 Mbps"],
    beds: ["Single bed"],
    photos: ["/images/single-c.jpg", "/images/bath-a.jpg", "/images/location-madina.jpg"],
  },
  {
    id: "FH-M106",
    locationId: "madina",
    block: "House 2",
    floor: 2,
    capacity: 4,
    bedsTaken: 1,
    pricePerSemester: 2100,
    nightlyRate: null,
    minNights: 0,
    bath: "Shared",
    policy: "Male",
    view: "Market",
    blurb:
      "The cheapest bed in the group. A male-only quad above the market road, three beds open this intake.",
    amenities: ["Four study desks", "Wardrobe", "Ceiling fan", "Shared kitchenette", "CCTV"],
    beds: ["Bunk A · lower", "Bunk A · upper", "Bunk B · lower", "Bunk B · upper"],
    photos: ["/images/quad-a.jpg", "/images/kitchen.jpg", "/images/bath-c.jpg"],
  },
  {
    id: "FH-M210",
    locationId: "madina",
    block: "House 3",
    floor: 1,
    capacity: 2,
    bedsTaken: 1,
    pricePerSemester: 3200,
    nightlyRate: null,
    minNights: 0,
    bath: "Shared",
    policy: "Female",
    view: "Garden",
    blurb:
      "A female-only twin opening onto the back garden, one bed left. Quiet side of the compound.",
    amenities: ["Two study desks", "Wardrobe", "Ceiling fan", "Wi-Fi 100 Mbps", "Water heater"],
    beds: ["Bed 1", "Bed 2"],
    photos: ["/images/twin-b.jpg", "/images/bath-c.jpg", "/images/location-madina.jpg"],
  },
  {
    id: "FH-M211",
    locationId: "madina",
    block: "House 3",
    floor: 2,
    capacity: 2,
    bedsTaken: 0,
    pricePerSemester: 3200,
    nightlyRate: null,
    minNights: 0,
    bath: "En-suite",
    policy: "Male",
    view: "Street",
    blurb:
      "Male-only twin with an en-suite on the top floor. Both beds open, both desks by the window.",
    amenities: ["En-suite shower", "Two study desks", "Wardrobe", "Ceiling fan", "Wi-Fi 100 Mbps"],
    beds: ["Bed 1", "Bed 2"],
    photos: ["/images/twin-c.jpg", "/images/bath-b.jpg", "/images/location-madina.jpg"],
  },

  // ------------------------------------------------------------------- Haatso
  {
    id: "FH-H105",
    locationId: "haatso",
    block: "House 1",
    floor: 1,
    capacity: 4,
    bedsTaken: 2,
    pricePerSemester: 2200,
    nightlyRate: null,
    minNights: 0,
    bath: "Shared",
    policy: "Female",
    view: "Garden",
    blurb:
      "Female-only quad facing the garden. Two beds open, and the reading room is on the same floor.",
    amenities: ["Four study desks", "Wardrobe", "Ceiling fan", "Shared kitchenette", "Wi-Fi 100 Mbps"],
    beds: ["Bunk A · lower", "Bunk A · upper", "Bunk B · lower", "Bunk B · upper"],
    photos: ["/images/quad-a.jpg", "/images/bath-c.jpg", "/images/kitchen.jpg"],
  },
  {
    id: "FH-H201",
    locationId: "haatso",
    block: "House 2",
    floor: 1,
    capacity: 1,
    bedsTaken: 0,
    pricePerSemester: 4600,
    nightlyRate: null,
    minNights: 0,
    bath: "En-suite",
    policy: "Female",
    view: "Compound",
    blurb:
      "Ground-floor female-only single with its own shower, eight minutes from the GIMPA gate.",
    amenities: ["En-suite shower", "Study desk", "Wardrobe", "Air conditioning", "Wi-Fi 100 Mbps"],
    beds: ["Single bed"],
    photos: ["/images/single-b.jpg", "/images/bath-a.jpg", "/images/location-haatso.jpg"],
  },
  {
    id: "FH-H202",
    locationId: "haatso",
    block: "House 2",
    floor: 2,
    capacity: 2,
    bedsTaken: 0,
    pricePerSemester: 3400,
    nightlyRate: 170,
    minNights: 3,
    bath: "Shared",
    policy: "Male",
    view: "Street",
    blurb:
      "A male twin that works for both semesters and short stays. Book by the night during vacation courses.",
    amenities: ["Two study desks", "Wardrobe", "Ceiling fan", "Wi-Fi 100 Mbps", "Borehole water"],
    beds: ["Bed 1", "Bed 2"],
    photos: ["/images/twin-a.jpg", "/images/bath-c.jpg", "/images/location-haatso.jpg"],
  },

  // --------------------------------------------------------------------- Tema
  {
    id: "FH-T101",
    locationId: "tema",
    block: "House 1",
    floor: 1,
    capacity: 1,
    bedsTaken: 0,
    pricePerSemester: 3900,
    nightlyRate: 200,
    minNights: 2,
    bath: "En-suite",
    policy: "Female",
    view: "Garden",
    blurb:
      "A female single for placements and attachments in Tema. En-suite, desk, and a gate that closes at 22:00.",
    amenities: ["En-suite shower", "Study desk", "Wardrobe", "Air conditioning", "Wi-Fi 100 Mbps"],
    beds: ["Single bed"],
    photos: ["/images/single-a.jpg", "/images/bath-b.jpg", "/images/location-tema.jpg"],
  },
  {
    id: "FH-T102",
    locationId: "tema",
    block: "House 1",
    floor: 2,
    capacity: 2,
    bedsTaken: 1,
    pricePerSemester: 2900,
    nightlyRate: 160,
    minNights: 3,
    bath: "Shared",
    policy: "Male",
    view: "Street",
    blurb:
      "Male twin in the Tema house, one bed open for the semester and the other free for short lets.",
    amenities: ["Two study desks", "Wardrobe", "Ceiling fan", "Wi-Fi 100 Mbps", "Power backup"],
    beds: ["Bed 1", "Bed 2"],
    photos: ["/images/twin-b.jpg", "/images/bath-c.jpg", "/images/location-tema.jpg"],
  },
  {
    id: "FH-T103",
    locationId: "tema",
    block: "House 2",
    floor: 1,
    capacity: 4,
    bedsTaken: 3,
    pricePerSemester: 1900,
    nightlyRate: 140,
    minNights: 2,
    bath: "Shared",
    policy: "Mixed",
    view: "Compound",
    blurb:
      "The lowest rate in the group. One bunk left for the semester, nightly rate for shorter stays.",
    amenities: ["Four study desks", "Wardrobe", "Ceiling fan", "Shared kitchenette", "CCTV"],
    beds: ["Bunk A · lower", "Bunk A · upper", "Bunk B · lower", "Bunk B · upper"],
    photos: ["/images/quad-a.jpg", "/images/kitchen.jpg", "/images/location-tema.jpg"],
  },
  // ------------------------------------------------------------------ Achimota
  {
    id: "FH-AH110",
    locationId: "achimota",
    block: "House 1",
    floor: 1,
    capacity: 2,
    bedsTaken: 1,
    pricePerSemester: 3100,
    nightlyRate: null,
    minNights: 0,
    bath: "Shared",
    policy: "Female",
    view: "Street",
    blurb:
      "A female twin above the shop on Mile 7 Road, one bed left. Ten minutes on foot to the Achimota trotro line.",
    amenities: ["Two study desks", "Wardrobe", "Ceiling fan", "Wi-Fi 100 Mbps", "Water heater"],
    beds: ["Bed 1", "Bed 2"],
    photos: ["/images/twin-a.jpg", "/images/twin-b.jpg", "/images/bath-b.jpg"],
  },
  {
    id: "FH-AH111",
    locationId: "achimota",
    block: "House 1",
    floor: 2,
    capacity: 4,
    bedsTaken: 0,
    pricePerSemester: 2000,
    nightlyRate: null,
    minNights: 0,
    bath: "Shared",
    policy: "Male",
    view: "Compound",
    blurb:
      "Male quad on the top floor, all four beds open. Built-in lockers under the bunks and a shared kitchenette.",
    amenities: ["Four study desks", "Wardrobe", "Ceiling fan", "Shared kitchenette", "CCTV"],
    beds: ["Bunk A \u00b7 lower", "Bunk A \u00b7 upper", "Bunk B \u00b7 lower", "Bunk B \u00b7 upper"],
    photos: ["/images/quad-a.jpg", "/images/kitchen.jpg", "/images/bath-c.jpg"],
  },

  // -------------------------------------------------------------------- Adenta
  {
    id: "FH-AD120",
    locationId: "adenta",
    block: "House 3",
    floor: 1,
    capacity: 1,
    bedsTaken: 0,
    pricePerSemester: 4100,
    nightlyRate: 180,
    minNights: 2,
    bath: "En-suite",
    policy: "Mixed",
    view: "Garden",
    blurb:
      "Single with its own shower on the ground floor of the Adenta house. The quietest room in the group.",
    amenities: ["En-suite shower", "Study desk", "Wardrobe", "Air conditioning", "Wi-Fi 100 Mbps"],
    beds: ["Single bed"],
    photos: ["/images/single-b.jpg", "/images/bath-a.jpg", "/images/location-adenta.jpg"],
  },
  {
    id: "FH-AD121",
    locationId: "adenta",
    block: "House 3",
    floor: 2,
    capacity: 2,
    bedsTaken: 1,
    pricePerSemester: 3000,
    nightlyRate: null,
    minNights: 0,
    bath: "Shared",
    policy: "Male",
    view: "Street",
    blurb:
      "Male twin on the upper floor, one bed open. Deep wardrobes and a window that catches the morning sun.",
    amenities: ["Two study desks", "Wardrobe", "Ceiling fan", "Wi-Fi 100 Mbps", "Power backup"],
    beds: ["Bed 1", "Bed 2"],
    photos: ["/images/twin-c.jpg", "/images/bath-c.jpg", "/images/location-adenta.jpg"],
  },

  // -------------------------------------------------------------------- Spintex
  {
    id: "FH-SP130",
    locationId: "spintex",
    block: "House 1",
    floor: 1,
    capacity: 2,
    bedsTaken: 0,
    pricePerSemester: 3500,
    nightlyRate: 175,
    minNights: 3,
    bath: "En-suite",
    policy: "Mixed",
    view: "Balcony",
    blurb:
      "Twin with an en-suite in the newest Franko build, opening onto a shared balcony above Spintex Road.",
    amenities: ["En-suite shower", "Two study desks", "Wardrobe", "Air conditioning", "Wi-Fi 100 Mbps"],
    beds: ["Bed 1", "Bed 2"],
    photos: ["/images/twin-b.jpg", "/images/bath-a.jpg", "/images/kitchen.jpg"],
  },
  {
    id: "FH-SP131",
    locationId: "spintex",
    block: "House 1",
    floor: 2,
    capacity: 4,
    bedsTaken: 2,
    pricePerSemester: 2300,
    nightlyRate: null,
    minNights: 0,
    bath: "Shared",
    policy: "Male",
    view: "Street",
    blurb:
      "Male quad a short walk from the Spintex shops, two beds open. Popular with students on attachment nearby.",
    amenities: ["Four study desks", "Wardrobe", "Ceiling fan", "Shared kitchenette", "Borehole water"],
    beds: ["Bunk A \u00b7 lower", "Bunk A \u00b7 upper", "Bunk B \u00b7 lower", "Bunk B \u00b7 upper"],
    photos: ["/images/quad-a.jpg", "/images/kitchen.jpg", "/images/bath-b.jpg"],
  },

  // ------------------------------------------------------------------ Sowutuom
  {
    id: "FH-SW140",
    locationId: "sowutuom",
    block: "House 2",
    floor: 1,
    capacity: 4,
    bedsTaken: 2,
    pricePerSemester: 1950,
    nightlyRate: null,
    minNights: 0,
    bath: "Shared",
    policy: "Female",
    view: "Compound",
    blurb:
      "Female quad ten minutes from Pentecost University, two beds open. The house has a covered study veranda.",
    amenities: ["Four study desks", "Wardrobe", "Ceiling fan", "Shared kitchenette", "Wi-Fi 100 Mbps"],
    beds: ["Bunk A \u00b7 lower", "Bunk A \u00b7 upper", "Bunk B \u00b7 lower", "Bunk B \u00b7 upper"],
    photos: ["/images/quad-a.jpg", "/images/bath-c.jpg", "/images/kitchen.jpg"],
  },
  {
    id: "FH-SW141",
    locationId: "sowutuom",
    block: "House 2",
    floor: 2,
    capacity: 1,
    bedsTaken: 0,
    pricePerSemester: 3600,
    nightlyRate: 150,
    minNights: 2,
    bath: "En-suite",
    policy: "Female",
    view: "Street",
    blurb:
      "Female single with its own shower on the first floor. Lets by the night for vacation courses at Pentvars.",
    amenities: ["En-suite shower", "Study desk", "Wardrobe", "Ceiling fan", "Wi-Fi 100 Mbps"],
    beds: ["Single bed"],
    photos: ["/images/single-c.jpg", "/images/bath-b.jpg", "/images/location-sowutuom.jpg"],
  },

];

export const bedsAvailable = (room: Room) => room.capacity - room.bedsTaken;

export const isOpen = (room: Room) => bedsAvailable(room) > 0;

export const supportsShortLet = (room: Room) => room.nightlyRate !== null;

export const totalBeds = rooms.reduce((sum, room) => sum + room.capacity, 0);

export const openBeds = rooms.reduce((sum, room) => sum + bedsAvailable(room), 0);

export const getRoom = (id: string) =>
  rooms.find((room) => room.id.toLowerCase() === id.toLowerCase());

export const roomsAt = (locationId: string) =>
  rooms.filter((room) => room.locationId === locationId);

export const formatCedis = (amount: number) =>
  new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 0,
  }).format(amount);

export const capacityLabel = (capacity: number) =>
  capacity === 1 ? "Single" : capacity === 2 ? "Twin" : "Quad";

export const capacityMeta = (capacity: number) =>
  `${capacity} occupant${capacity === 1 ? "" : "s"} · ${capacityLabel(capacity)}`;

export const policyLabel = (policy: Room["policy"]) =>
  policy === "Mixed" ? "All students" : `${policy} only`;

export const roomHeadline = (room: Room) =>
  `${capacityLabel(room.capacity)} room at ${getLocation(room.locationId).hostel}`;

export const priceLabel = (room: Room, stay: "semester" | "short") =>
  stay === "short" && room.nightlyRate
    ? `${formatCedis(room.nightlyRate)} per night`
    : `${formatCedis(room.pricePerSemester)} per semester`;
