export type Capacity = 1 | 2 | 4;

export type Policy = "Female" | "Male" | "Mixed";

export type StayType = "semester" | "short";

export type Location = {
  id: string;
  name: string;
  hostel: string;
  address: string;
  landmark: string;
  commute: string;
  blurb: string;
  photo: string;
};

export type Room = {
  id: string;
  locationId: string;
  block: string;
  floor: number;
  capacity: Capacity;
  bedsTaken: number;
  pricePerSemester: number;
  /** Nightly rate for short lets. `null` means the room is semester only. */
  nightlyRate: number | null;
  minNights: number;
  bath: "Private" | "Shared" | "En-suite";
  policy: Policy;
  view: string;
  blurb: string;
  amenities: string[];
  /** Bunk labels, in the order they appear in the room. */
  beds: string[];
  /** Photographs, first one is used as the cover image. */
  photos: string[];
};

export type Account = {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
};

export type Application = {
  reference: string;
  accountId: string;
  roomId: string;
  fullName: string;
  email: string;
  studentId: string;
  phone: string;
  institution: string;
  level: string;
  programme: string;
  gender: string;
  bedPreference: string;
  checkIn: string;
  duration: string;
  nights: string;
  guardianName: string;
  guardianPhone: string;
  emergencyName: string;
  emergencyRelationship: string;
  notes: string;
  submittedAt: string;
};
