import { City, Partner } from "./types";

export const SHOW_GALLERY = false;

export const CITIES: City[] = [
  {
    id: "cartagena",
    name: "Cartagena",
    lat: 10.391,
    lng: -75.5146,
    date: null,
    confirmed: false,
    registrationUrl: null,
    description: "La ciudad amurallada se prepara para el blockchain.",
  },
  {
    id: "barranquilla",
    name: "Barranquilla",
    lat: 10.9685,
    lng: -74.7813,
    date: null,
    confirmed: false,
    registrationUrl: null,
    description: "La puerta de oro de Colombia entra al mundo Web3.",
  },
  {
    id: "medellin",
    name: "Medellín",
    lat: 6.2442,
    lng: -75.5812,
    date: "30 de Mayo, 2026",
    confirmed: true,
    registrationUrl: "#",
    description: "La ciudad de la innovación recibe a MonadBlitz.",
  },
  {
    id: "bogota",
    name: "Bogotá",
    lat: 4.711,
    lng: -74.0721,
    date: null,
    confirmed: false,
    registrationUrl: null,
    description: "La capital se une al tour Monad.",
  },
];

export const PARTNERS: Partner[] = [
  { name: "CTG OnChain", logo: null },
  {
    name: "Medellín Blockchain Community",
    logo: "/images/partners/medellin-blockchain.png",
  },
  { name: "DevLabX3", logo: null },
];
