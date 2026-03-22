import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-glass-border py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/monad/logo-mark.svg"
              alt="Monad"
              width={24}
              height={24}
              className="rounded-sm"
            />
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-white">MONAD</span>
              <span className="text-white/50 ml-1 text-sm font-medium">
                TOUR COLOMBIA
              </span>
            </span>
          </div>

          {/* Nav links */}
          <div className="flex gap-6 text-sm text-white/50 font-mono">
            <a href="#sobre" className="hover:text-white transition-colors">
              Sobre
            </a>
            <a href="#ciudades" className="hover:text-white transition-colors">
              Ciudades
            </a>
            <a href="#partners" className="hover:text-white transition-colors">
              Partners
            </a>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            <a
              href="https://discord.gg/monad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-monad-primary transition-colors text-sm font-mono"
            >
              Discord
            </a>
            <a
              href="https://x.com/moaboradweb3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-monad-primary transition-colors text-sm font-mono"
            >
              X / Twitter
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-glass-border text-center">
          <p className="text-xs text-white/30">
            © 2026 Monad. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/20 mt-1">Powered by Monad</p>
        </div>
      </div>
    </footer>
  );
}
