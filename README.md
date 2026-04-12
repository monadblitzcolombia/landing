# Monad Tour Colombia 2026

Landing page oficial del Monad Tour Colombia - una serie de hackathons MonadBlitz en 4 ciudades colombianas.

![Monad](https://img.shields.io/badge/Monad-6E54FF?style=for-the-badge&logo=ethereum&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Sobre el Proyecto

Monad Tour Colombia es una iniciativa que lleva la blockchain de alto rendimiento Monad a través de Colombia, organizando hackathons MonadBlitz en las principales ciudades del país.

**Características de Monad:**

- 10,000 TPS (Transacciones por segundo)
- 100% compatible con EVM
- Finalidad de 0.8 segundos
- Tiempo de bloque de 0.4 segundos

## Stack Tecnológico

### Core

- **Framework:** [Next.js 16.2.1](https://nextjs.org/) (App Router + Turbopack)
- **Lenguaje:** [TypeScript 5](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) con PostCSS

### UI/UX

- **Animaciones:** [Framer Motion 12.38.0](https://www.framer.com/motion/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Mapas:** [React Leaflet 5.0.0](https://react-leaflet.js.org/) + [Leaflet 1.9.4](https://leafletjs.com/)
- **Fuentes:** Google Fonts (Inter, Roboto Mono, Space Grotesk)

### Herramientas de Desarrollo

- **Linting:** ESLint 9 (Next.js config)
- **Formateo:** Prettier
- **Testing:** Vitest + React Testing Library
- **Git Hooks:** Husky + lint-staged
- **Type Checking:** TypeScript strict mode

## Instalación y Desarrollo

### Requisitos

- Node.js 20.x o superior
- npm 10.x o superior

### Setup Local

```bash
# Clonar el repositorio
git clone https://github.com/[org]/monad-tour-colombia.git
cd monad-tour-colombia

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (Turbopack)
npm start            # Inicia servidor de producción

# Build
npm run build        # Compila para producción
npm run build:check  # Ejecuta lint + type-check + build

# Calidad de Código
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Ejecuta ESLint y corrige errores
npm run type-check   # Verifica tipos de TypeScript
npm run format       # Formatea código con Prettier
npm run format:check # Verifica formateo sin modificar

# Testing
npm test             # Ejecuta tests en modo watch
npm run test:ui      # Abre interfaz visual de Vitest
npm run test:run     # Ejecuta tests una vez (CI)
```

## Estructura del Proyecto

```
monad-tour-colombia/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout raíz con metadata
│   │   ├── page.tsx            # Página principal
│   │   ├── globals.css         # Estilos globales + Tailwind
│   │   ├── favicon.ico         # Favicon de Monad
│   │   ├── icon.png            # App icon
│   │   └── sitemap.ts          # Sitemap dinámico
│   ├── components/
│   │   ├── Navbar.tsx          # Navegación principal
│   │   ├── Hero.tsx            # Hero section con mapa
│   │   ├── Stats.tsx           # Estadísticas de Monad
│   │   ├── EventsTable.tsx     # Tabla de eventos por ciudad
│   │   ├── BuildFeatures.tsx   # Tarjetas de features
│   │   ├── Marquee.tsx         # Marquee de partners
│   │   ├── ExploreCards.tsx    # Cards de exploración
│   │   ├── Footer.tsx          # Footer con navegación
│   │   ├── ScrollNav.tsx       # Navegación lateral scroll
│   │   ├── MapColombia.tsx     # Mapa interactivo Leaflet
│   │   ├── BuildMegaMenu.tsx   # Mega menu dropdown
│   │   ├── ConcentricCircles.tsx # Decoración SVG
│   │   └── ScrambleLink.tsx    # Link con efecto scramble
│   ├── lib/
│   │   ├── constants.ts        # Ciudades, partners, links
│   │   ├── buildMenuData.ts    # Datos del mega menu
│   │   └── types.ts            # TypeScript interfaces
│   ├── hooks/
│   │   └── useTextScramble.ts  # Hook para efecto scramble
│   └── __tests__/
│       ├── setup.ts            # Configuración de tests
│       └── components/
│           └── *.test.tsx      # Tests de componentes
├── public/
│   ├── images/
│   │   ├── monad/              # Logos de Monad
│   │   └── partners/           # Logos de aliados
│   └── robots.txt              # SEO robots
├── .husky/                     # Git hooks
├── vitest.config.ts            # Configuración de Vitest
├── .prettierrc.json            # Configuración de Prettier
├── eslint.config.mjs           # Configuración de ESLint
├── tsconfig.json               # Configuración de TypeScript
├── next.config.ts              # Configuración de Next.js
├── postcss.config.mjs          # Configuración de PostCSS
├── tailwind.config.ts          # Configuración de Tailwind
└── package.json                # Dependencias y scripts
```

## Componentes Principales

### Hero

Sección principal con:

- Mapa interactivo de Colombia (React Leaflet)
- Animaciones parallax con scroll
- Panel deslizante de estadísticas
- Colombian flag accent

### EventsTable

Lista de eventos MonadBlitz:

- Medellín - 30 de Mayo, 2026 ✅
- Bogotá - 4 de Julio, 2026 ✅
- Cali - Próximamente
- Cartagena - Próximamente
- Barranquilla - Próximamente

### BuildFeatures

Tarjetas interactivas con:

- Ilustraciones SVG personalizadas
- Parallax mouse tracking
- Animaciones on scroll

## SEO y Metadatos

La página incluye:

- Open Graph tags completos
- Twitter Card support
- Sitemap dinámico (`/sitemap.xml`)
- Robots.txt configurado
- Keywords optimizados
- Canonical URLs

## Pre-commit Hooks

El proyecto usa Husky para ejecutar automáticamente antes de cada commit:

- ESLint (con auto-fix)
- Prettier (formateo automático)
- Type checking (opcional)

Para hacer commit sin hooks (emergencias):

```bash
git commit --no-verify -m "mensaje"
```

## Testing

Tests unitarios con Vitest:

```bash
# Ejecutar tests
npm test

# Ver interfaz visual
npm run test:ui

# Ejecutar una vez (CI)
npm run test:run
```

## Deployment

### Vercel (Recomendado)

```bash
# Conectar repositorio en vercel.com
# Deploy automático en cada push a main
```

### Manual

```bash
npm run build
npm start
```

## Ciudades del Tour

| Ciudad       | Fecha            | Estado        | Registro                          |
| ------------ | ---------------- | ------------- | --------------------------------- |
| Medellín     | 30 de Mayo, 2026 | ✅ Confirmado | [Link](https://luma.com/o56ekpyb) |
| Bogotá       | 4 de Julio, 2026 | ✅ Confirmado | [Link](https://luma.com/gytabj8l) |
| Cali         | TBA              | Próximamente  | -                                 |
| Cartagena    | TBA              | Próximamente  | -                                 |
| Barranquilla | TBA              | Próximamente  | -                                 |

## Partners y Aliados

- **Medellín Blockchain Community**
- **DevLabX3**

## Links Útiles

- [Monad Foundation](https://www.monad.xyz/)
- [Documentación](https://docs.monad.xyz/)
- [Portal de Developers](https://developers.monad.xyz/)
- [Discord](https://discord.gg/monad)
- [Twitter](https://x.com/monad_xyz)

## Contribuir

1. Fork el proyecto
2. Crea una branch (`git checkout -b feature/nueva-feature`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva feature'`)
4. Push a la branch (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

## Licencia

© 2026 Monad Foundation. Todos los derechos reservados.

---

**Construido con 💜 para la comunidad blockchain de Colombia**
