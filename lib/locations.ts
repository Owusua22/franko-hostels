import type { Location } from "./types";

export const locations: Location[] = [
  {
    id: "east-legon",
    name: "East Legon",
    hostel: "Franko East Legon",
    address: "Links Road, East Legon",
    landmark: "Legon gate",
    commute: "6 min walk",
    blurb:
      "The original Franko house. Three blocks around a planted courtyard, five minutes from the Legon gate and the trotro stop.",
    photo: "/images/garden.jpg",
  },
  {
    id: "madina",
    name: "Madina",
    hostel: "Franko Madina",
    address: "Madina Market Road",
    landmark: "Madina market",
    commute: "12 min",
    blurb:
      "Steps from Madina market and the trotro hub. Popular with students who want the city around them and a fast ride to campus.",
    photo: "/images/location-madina.jpg",
  },
  {
    id: "haatso",
    name: "Haatso",
    hostel: "Franko Haatso",
    address: "Haatso Atomic Road",
    landmark: "GIMPA campus",
    commute: "8 min",
    blurb:
      "A quiet residential street between Atomic and Haatso. Best for GIMPA students and anyone who studies better away from traffic.",
    photo: "/images/location-haatso.jpg",
  },
  {
    id: "achimota",
    name: "Achimota",
    hostel: "Franko Achimota",
    address: "Achimota Mile 7 Road",
    landmark: "Achimota mall",
    commute: "14 min",
    blurb:
      "A newer block behind the Mile 7 junction, with a shop downstairs and the trotro line to Legon running to the gate.",
    photo: "/images/location-achimota.jpg",
  },
  {
    id: "adenta",
    name: "Adenta",
    hostel: "Franko Adenta",
    address: "Adenta Housing Down",
    landmark: "Adenta barrier",
    commute: "22 min",
    blurb:
      "Houses on a quiet cul-de-sac in Adenta Housing. The longest commute of the group, and the quietest nights.",
    photo: "/images/location-adenta.jpg",
  },
  {
    id: "spintex",
    name: "Spintex",
    hostel: "Franko Spintex",
    address: "Spintex Road, near Baatsona",
    landmark: "Spintex shops",
    commute: "20 min",
    blurb:
      "A bright new build with wide corridors and breeze-block walls. Good for students on attachment in the Spintex and Tema corridor.",
    photo: "/images/location-spintex.jpg",
  },
  {
    id: "sowutuom",
    name: "Sowutuom",
    hostel: "Franko Sowutuom",
    address: "Sowutuom, off Awoshie Road",
    landmark: "Pentvars",
    commute: "10 min",
    blurb:
      "The closest Franko house to Pentecost University, on a street of family homes with steady water and power.",
    photo: "/images/location-sowutuom.jpg",
  },
  {
    id: "tema",
    name: "Tema",
    hostel: "Franko Tema",
    address: "Community 25, Tema",
    landmark: "Tema campuses",
    commute: "5 min",
    blurb:
      "Our short let house for placements, attachments and vacation courses at the Tema campuses. Weekly rates available.",
    photo: "/images/location-tema.jpg",
  },
];

export const getLocation = (id: string) =>
  locations.find((location) => location.id === id) ?? locations[0];

export const locationName = (id: string) => getLocation(id).name;
