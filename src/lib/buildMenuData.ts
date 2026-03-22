import type { LucideIcon } from "lucide-react";
import {
  Rocket,
  BookOpen,
  SquareTerminal,
  Blocks,
  MessageSquareText,
  Zap,
  Flame,
  Trophy,
} from "lucide-react";

export interface BuildMenuItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface BuildMenuColumn {
  heading: string;
  items: BuildMenuItem[];
}

export const BUILD_MENU_COLUMNS: BuildMenuColumn[] = [
  {
    heading: "CONSTRUIR",
    items: [
      {
        title: "Empezar a construir",
        description:
          "Explora programas, recursos y una comunidad de primer nivel para fundadores y developers que construyen en Monad.",
        href: "https://www.monad.xyz/build",
        icon: Rocket,
      },
      {
        title: "Documentación",
        description: "Aprende a escribir smart contracts en Monad.",
        href: "https://docs.monad.xyz/",
        icon: BookOpen,
      },
      {
        title: "Portal de Developers",
        description:
          "Únete a la comunidad de developers de Monad. Despliega contratos, completa misiones y construye en la EVM más rápida.",
        href: "https://developers.monad.xyz/",
        icon: SquareTerminal,
      },
      {
        title: "Directorio de Infra",
        description:
          "Explora nuestro directorio de herramientas y servicios para construir en Monad.",
        href: "https://www.monad.xyz/infra",
        icon: Blocks,
      },
      {
        title: "Foro de Investigación",
        description: "Discusiones sobre descentralización y rendimiento.",
        href: "https://forum.monad.xyz/",
        icon: MessageSquareText,
      },
    ],
  },
  {
    heading: "PROGRAMAS",
    items: [
      {
        title: "DeltaV",
        description:
          "Conecta con inversionistas, mentores y recursos para impulsar tu startup.",
        href: "https://deltav.monad.xyz/",
        icon: Zap,
      },
      {
        title: "Monad Momentum",
        description: "Programa de incentivos que impulsa el crecimiento en Monad Mainnet.",
        href: "https://momentum.monad.xyz/",
        icon: Flame,
      },
      {
        title: "Monad Madness",
        description:
          "Competencia global de pitch para fundadores ambiciosos que construyen en Monad.",
        href: "https://madness.monad.xyz/",
        icon: Trophy,
      },
    ],
  },
];
