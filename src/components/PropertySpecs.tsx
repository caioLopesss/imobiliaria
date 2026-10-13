import { tipoLabel } from "@/lib/constants"
import { formatArea } from "@/lib/format"
import type { Imovel } from "@/lib/types"

function Spec({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-0 py-4 site:px-5 site:first:pl-0 site:last:pr-0">
      <p className="font-mono text-[22px] font-medium">{value}</p>
      <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-ink-soft uppercase">
        {label}
      </p>
    </div>
  )
}

export function PropertySpecs({ imovel }: { imovel: Imovel }) {
  const specs = [
    { value: formatArea(imovel.area), label: "m² úteis" },
    {
      value: imovel.quartos != null ? String(imovel.quartos) : "—",
      label: "quartos",
    },
    {
      value: imovel.banheiros != null ? String(imovel.banheiros) : "—",
      label: "banheiros",
    },
    {
      value: imovel.vagas != null ? String(imovel.vagas) : "—",
      label: "vagas",
    },
    { value: tipoLabel(imovel.tipo), label: "tipo" },
  ]

  return (
    <div className="grid grid-cols-2 border-b border-line typo:grid-cols-5 typo:divide-x typo:divide-line">
      {specs.map((spec) => (
        <div key={spec.label} className="border-b border-line typo:border-b-0">
          <Spec value={spec.value} label={spec.label} />
        </div>
      ))}
    </div>
  )
}
