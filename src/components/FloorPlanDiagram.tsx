export function FloorPlanDiagram({
  area,
  quartos,
  titulo,
}: {
  area: number | null
  quartos: number | null
  titulo: string
}) {
  const rooms = Math.max(quartos ?? 1, 1)
  const roomWidth = 280 / rooms
  const areaLabel = area != null ? `${Math.round(area)} m²` : "—"

  return (
    <div className="border border-line bg-paper-2 p-4">
      <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-brass uppercase">
        Planta baixa — {titulo}
      </p>
      <svg
        viewBox="0 0 320 200"
        className="h-auto w-full"
        role="img"
        aria-label={`Diagrama esquemático de ${titulo}, ${areaLabel}`}
      >
        <rect x="20" y="24" width="280" height="152" fill="none" stroke="#2B241E" strokeWidth="1.4" />
        {Array.from({ length: rooms - 1 }, (_, index) => (
          <line
            key={index}
            x1={20 + roomWidth * (index + 1)}
            y1="24"
            x2={20 + roomWidth * (index + 1)}
            y2="176"
            stroke="#2B241E"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
        ))}
        <rect x="20" y="118" width={Math.min(roomWidth, 90)} height="58" fill="none" stroke="#A8845F" strokeWidth="1.2" />
        {Array.from({ length: rooms }, (_, index) => (
          <text
            key={index}
            x={20 + roomWidth * index + roomWidth / 2}
            y="70"
            textAnchor="middle"
            fill="#A8845F"
            fontSize="10"
            fontFamily="IBM Plex Mono, ui-monospace, monospace"
          >
            {index === 0 ? "ESTAR" : `Q${index}`}
          </text>
        ))}
        <text
          x="160"
          y="16"
          textAnchor="middle"
          fill="#A8845F"
          fontSize="10"
          fontFamily="IBM Plex Mono, ui-monospace, monospace"
        >
          {areaLabel}
        </text>
        <text
          x="20"
          y="194"
          fill="#6B5B4C"
          fontSize="9"
          fontFamily="IBM Plex Mono, ui-monospace, monospace"
        >
          0
        </text>
        <text
          x="300"
          y="194"
          textAnchor="end"
          fill="#6B5B4C"
          fontSize="9"
          fontFamily="IBM Plex Mono, ui-monospace, monospace"
        >
          esquema
        </text>
      </svg>
    </div>
  )
}
