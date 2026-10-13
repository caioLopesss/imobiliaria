import { formatPreco } from "@/lib/format"
import type { NeighborhoodStat } from "@/lib/types"

export function NeighborhoodGrid({
  neighborhoods,
}: {
  neighborhoods: NeighborhoodStat[]
}) {
  if (!neighborhoods.length) return null

  return (
    <div className="grid grid-cols-2 gap-px bg-line site:grid-cols-4">
      {neighborhoods.map((item) => (
        <article key={item.bairro} className="bg-paper px-4 py-6 typo:px-5">
          <p className="font-mono text-[11px] tracking-wide text-brass">
            {item.coord}
          </p>
          <h3 className="font-display mt-3 text-[22px] leading-tight">
            {item.bairro}
          </h3>
          <p className="mt-3 font-mono text-[12px] text-ink-soft">
            {item.precoM2 != null
              ? `${formatPreco(item.precoM2)} / m²`
              : "média sob consulta"}
          </p>
        </article>
      ))}
    </div>
  )
}
