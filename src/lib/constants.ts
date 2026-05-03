import { City, Partner, PartnerCategory, FAQItem, FooterLink } from "./types";

export const CITIES: City[] = [
  {
    id: "medellin",
    name: "Medellín",
    lat: 6.2442,
    lng: -75.5812,
    date: "6 de Junio, 2026",
    dateISO: "2026-06-06",
    confirmed: true,
    registrationUrl: "https://luma.com/o56ekpyb",
    description: "La ciudad de la innovación recibe a MonadBlitz.",
    eventType: "MonadBlitz Hackathon",
    venue: "Medellín, Colombia",
  },
  {
    id: "bogota",
    name: "Bogotá",
    lat: 4.711,
    lng: -74.0721,
    date: "4 de Julio, 2026",
    dateISO: "2026-07-04",
    confirmed: true,
    registrationUrl: "https://luma.com/gytabj8l",
    description: "La capital se une al tour Monad.",
    eventType: "MonadBlitz Hackathon",
    venue: "Bogotá, Colombia",
  },
  {
    id: "cali",
    name: "Cali",
    lat: 3.4516,
    lng: -76.532,
    date: null,
    dateISO: null,
    confirmed: false,
    registrationUrl: null,
    description: "La capital de la salsa se suma al tour blockchain.",
    eventType: "MonadBlitz Hackathon",
  },
  {
    id: "cartagena",
    name: "Cartagena",
    lat: 10.391,
    lng: -75.5146,
    date: null,
    dateISO: null,
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
    dateISO: null,
    confirmed: false,
    registrationUrl: null,
    description: "La puerta de oro de Colombia entra al mundo Web3.",
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

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    title: "ORGANIZA",
    partners: [{ name: "Medellín Blockchain", logo: "/images/partners/medellin-blockchain.svg" }],
  },
  {
    title: "APOYAN",
    partners: [
      { name: "DevLabX3", logo: "/images/partners/devlabx3.svg" },
      { name: "Monad Foundation", logo: "/images/monad/logo-mark.svg" },
    ],
  },
  {
    title: "COMUNIDADES ALIADAS",
    partners: [
      { name: "UPB", logo: null },
      { name: "EAFIT", logo: null },
      { name: "ITM", logo: null },
      { name: "UdeA", logo: null },
      { name: "TdeA", logo: null },
      { name: "Ultravioleta DAO", logo: null },
    ],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Necesito saber programar para participar?",
    answer:
      "Si, MonadBlitz es un hackathon enfocado en builders. Necesitas conocimientos basicos de programacion, idealmente en Solidity o desarrollo Web3. Sin embargo, los equipos pueden incluir roles no-tecnicos como diseno o producto.",
  },
  {
    question: "El evento es gratis?",
    answer:
      "Si, la participacion en MonadBlitz es completamente gratuita. Solo necesitas registrarte a traves de Luma.",
  },
  {
    question: "Puedo ir solo o necesito equipo?",
    answer:
      "Puedes asistir solo. Al inicio del evento hay una dinamica de formacion de equipos donde puedes encontrar companeros. Tambien puedes llegar con tu equipo ya formado (maximo 5 personas).",
  },
  {
    question: "Que necesito llevar?",
    answer:
      "Tu laptop con el entorno de desarrollo listo, cargador, y muchas ganas de construir. Nosotros proporcionamos internet de alta velocidad, brunch, almuerzo, snacks, bebidas y cerveza todo el dia, mas un swag kit.",
  },
  {
    question: "Hay premios?",
    answer:
      "Si. MonadBlitz Medellin tiene un prize pool de $2,000 USD: $1,000 para el 1er lugar, $700 para el 2do y $300 para el 3ro.",
  },
  {
    question: "El evento es en espanol o ingles?",
    answer:
      "El evento es principalmente en espanol, pero los mentores pueden asistir en ambos idiomas. La documentacion de Monad esta en ingles.",
  },
  {
    question: "Que es Monad?",
    answer:
      "Monad es una blockchain Layer 1 compatible con EVM que ofrece 10,000 transacciones por segundo, finalidad en menos de 1 segundo y gas fees minimos. Es la blockchain de mayor rendimiento compatible con Ethereum.",
  },
  {
    question: "Como me preparo para el hackathon?",
    answer:
      "Revisa la documentacion de Monad en docs.monad.xyz, familiarizate con Solidity y el desarrollo de smart contracts, y unete al Discord de Monad para conectar con la comunidad.",
  },
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
      { label: "Aplicar como Mentor", href: "/apply/mentor" },
      { label: "Aplicar como Jurado", href: "/apply/judge" },
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
