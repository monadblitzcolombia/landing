"use client";

interface MapStaticProps {
  onCityClick?: (cityId: string) => void;
}

const cities = [
  { id: "barranquilla", name: "Barranquilla", x: 165, y: 52, labelDx: 15, labelDy: 4 },
  { id: "cartagena", name: "Cartagena", x: 145, y: 62, labelDx: -15, labelDy: 4, anchorEnd: true },
  { id: "medellin", name: "Medellín", x: 148, y: 120, labelDx: -15, labelDy: 4, anchorEnd: true },
  { id: "bogota", name: "Bogotá", x: 175, y: 145, labelDx: 15, labelDy: 4 },
];

export default function MapStatic({ onCityClick }: MapStaticProps) {
  const handleClick = (cityId: string) => {
    if (onCityClick) {
      onCityClick(cityId);
    } else {
      document.getElementById(`city-${cityId}`)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <svg viewBox="60 0 200 290" className="w-full h-auto" aria-label="Mapa de Colombia">
      <defs>
        <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6E54FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6E54FF" stopOpacity="0" />
        </radialGradient>
        <filter id="dot-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Colombia silhouette */}
      <path
        d="M120,30 L155,25 L180,35 L195,30 L210,40 L200,55 L215,65 L210,80 L195,75 L190,90 L200,105 L195,120 L205,135 L200,150 L210,165 L205,180 L195,195 L185,210 L175,225 L160,235 L150,250 L140,260 L125,255 L115,240 L105,225 L100,210 L95,195 L100,180 L95,165 L105,150 L110,135 L105,120 L115,105 L120,90 L110,75 L115,60 L125,45 Z"
        fill="rgba(110, 84, 255, 0.06)"
        stroke="rgba(110, 84, 255, 0.25)"
        strokeWidth="1"
      />

      {/* "COLOMBIA" watermark */}
      <text
        x="155"
        y="210"
        textAnchor="middle"
        fill="rgba(255,255,255,0.06)"
        fontSize="14"
        fontWeight="800"
        letterSpacing="4"
      >
        COLOMBIA
      </text>

      {/* City markers */}
      {cities.map((city) => (
        <g
          key={city.id}
          onClick={() => handleClick(city.id)}
          className="cursor-pointer"
          role="button"
          aria-label={`Ir a ${city.name}`}
        >
          {/* Outer glow */}
          <circle cx={city.x} cy={city.y} r="10" fill="url(#map-glow)" />
          {/* Glow ring */}
          <circle
            cx={city.x}
            cy={city.y}
            r="7"
            fill="none"
            stroke="rgba(110, 84, 255, 0.2)"
            strokeWidth="0.5"
          />
          {/* Dot */}
          <circle
            cx={city.x}
            cy={city.y}
            r="3"
            fill="#6E54FF"
            filter="url(#dot-glow)"
            className="animate-pulse-glow"
          />
          {/* Label to the side */}
          <text
            x={city.x + city.labelDx}
            y={city.y + city.labelDy}
            textAnchor={city.anchorEnd ? "end" : "start"}
            fill="rgba(255,255,255,0.5)"
            fontSize="6"
            fontWeight="500"
          >
            {city.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
