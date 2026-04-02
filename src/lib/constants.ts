import { City, Partner, FooterLink } from "./types";

export const CITIES: City[] = [
  {
    id: "medellin",
    name: "Medellín",
    lat: 6.2442,
    lng: -75.5812,
    date: "30 de Mayo, 2026",
    confirmed: true,
    registrationUrl: "https://forms.gle/3WnVunWMqAkz9KQC8",
    description: "La ciudad de la innovación recibe a MonadBlitz.",
    eventType: "MonadBlitz Hackathon",
  },
  {
    id: "bogota",
    name: "Bogotá",
    lat: 4.711,
    lng: -74.0721,
    date: "4 de Julio, 2026",
    confirmed: true,
    registrationUrl: "https://forms.gle/3WnVunWMqAkz9KQC8",
    description: "La capital se une al tour Monad.",
    eventType: "MonadBlitz Hackathon",
  },
  {
    id: "cartagena",
    name: "Cartagena",
    lat: 10.391,
    lng: -75.5146,
    date: null,
    confirmed: false,
    registrationUrl: null,
    description: "La ciudad amurallada se prepara para el blockchain.",
    eventType: "MonadBlitz Hackathon",
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
    eventType: "MonadBlitz Hackathon",
  },
  {
    id: "cali",
    name: "Cali",
    lat: 3.4516,
    lng: -76.532,
    date: null,
    confirmed: false,
    registrationUrl: null,
    description: "La capital de la salsa se suma al tour blockchain.",
    eventType: "MonadBlitz Hackathon",
  },
];

export const PARTNERS: Partner[] = [
  {
    name: "Medellín Blockchain Community",
    logo: "/images/partners/medellin-blockchain.svg",
  },
  { name: "DevLabX3", logo: "/images/partners/devlabx3.svg" },
];

export const FOOTER_NAV: Record<string, { title: string; links: FooterLink[] }> = {
  principal: {
    title: "PRINCIPAL",
    links: [
      { label: "Inicio", href: "#hero" },
      { label: "Explorar Ecosistema", href: "https://app.monad.xyz/" },
      { label: "Eventos", href: "#eventos" },
    ],
  },
  construir: {
    title: "CONSTRUIR",
    links: [
      { label: "Empezar a Construir", href: "https://www.monad.xyz/build" },
      { label: "Portal de Developers", href: "https://developers.monad.xyz/" },
      { label: "Documentacion", href: "https://docs.monad.xyz/" },
      { label: "Directorio de Infra", href: "https://www.monad.xyz/infra" },
      { label: "Foro de Investigacion", href: "https://forum.monad.xyz/" },
    ],
  },
  programas: {
    title: "PROGRAMAS",
    links: [
      { label: "DeltaV", href: "https://deltav.monad.xyz/" },
      { label: "Monad Momentum", href: "https://momentum.monad.xyz/" },
      { label: "Monad Madness", href: "https://madness.monad.xyz/" },
    ],
  },
  comunidad: {
    title: "COMUNIDAD",
    links: [
      { label: "Monad Foundation", href: "https://www.monad.xyz/" },
      { label: "Brand & Media Kit", href: "https://www.monad.xyz/brand" },
    ],
  },
};

export const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/monad_xyz" },
  { label: "Discord", href: "https://discord.gg/monad" },
];
