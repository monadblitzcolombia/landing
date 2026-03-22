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
    heading: "BUILD",
    items: [
      {
        title: "Start Building",
        description:
          "Explore programs, resources, and a world-class community for founders and developers building on Monad.",
        href: "https://www.monad.xyz/build",
        icon: Rocket,
      },
      {
        title: "Documentation",
        description: "Learn how to write smart contracts on Monad.",
        href: "https://docs.monad.xyz/",
        icon: BookOpen,
      },
      {
        title: "Developer Portal",
        description:
          "Join the Monad developer community. Deploy contracts, complete missions, and build on the fastest EVM.",
        href: "https://developers.monad.xyz/",
        icon: SquareTerminal,
      },
      {
        title: "Infra Directory",
        description:
          "Explore our directory of tools and services used to build on Monad.",
        href: "https://www.monad.xyz/infra",
        icon: Blocks,
      },
      {
        title: "Research Forum",
        description: "Discuss research on decentralization and performance.",
        href: "https://forum.monad.xyz/",
        icon: MessageSquareText,
      },
    ],
  },
  {
    heading: "PROGRAMS",
    items: [
      {
        title: "DeltaV",
        description:
          "Connect with investors, mentors, and resources to fuel your startup journey.",
        href: "https://deltav.monad.xyz/",
        icon: Zap,
      },
      {
        title: "Monad Momentum",
        description: "Incentive program fueling growth on Monad Mainnet.",
        href: "https://momentum.monad.xyz/",
        icon: Flame,
      },
      {
        title: "Monad Madness",
        description:
          "Monad Madness is a global pitch competition for ambitious founders building on Monad.",
        href: "https://madness.monad.xyz/",
        icon: Trophy,
      },
    ],
  },
];
