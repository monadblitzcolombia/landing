"use client";

interface MapStaticProps {
  onCityClick?: (cityId: string) => void;
}

const cities = [
  { id: "cartagena", name: "CTG", x: 145, y: 62 },
  { id: "barranquilla", name: "BAQ", x: 165, y: 52 },
  { id: "medellin", name: "MDE", x: 148, y: 120 },
  { id: "bogota", name: "BOG", x: 175, y: 145 },
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
    <svg viewBox="0 0 350 350" className="w-full h-full max-h-[400px]" aria-label="Mapa de Colombia">
      {/* Colombia silhouette (simplified) */}
      <path
        d="M120,30 L155,25 L180,35 L195,30 L210,40 L200,55 L215,65 L210,80 L195,75 L190,90 L200,105 L195,120 L205,135 L200,150 L210,165 L205,180 L195,195 L185,210 L175,225 L160,235 L150,250 L140,260 L125,255 L115,240 L105,225 L100,210 L95,195 L100,180 L95,165 L105,150 L110,135 L105,120 L115,105 L120,90 L110,75 L115,60 L125,45 Z"
        fill="rgba(110, 84, 255, 0.08)"
        stroke="rgba(110, 84, 255, 0.3)"
        strokeWidth="1.5"
      />

      {/* City markers */}
      {cities.map((city) => (
        <g
          key={city.id}
          onClick={() => handleClick(city.id)}
          className="cursor-pointer"
          role="button"
          aria-label={`Ir a ${city.name}`}
        >
          {/* Glow ring */}
          <circle cx={city.x} cy={city.y} r="12" fill="rgba(110, 84, 255, 0.15)" />
          {/* Dot */}
          <circle
            cx={city.x}
            cy={city.y}
            r="5"
            fill="#6E54FF"
            className="animate-pulse-glow"
          />
          {/* Label */}
          <text
            x={city.x}
            y={city.y + 22}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="10"
            fontWeight="600"
          >
            {city.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
