import Link from "next/link"

import { BlueprintFrame } from "@/components/BlueprintFrame"
import { CardGallery } from "@/components/CardGallery"
import { tipoLabel } from "@/lib/constants"
import { formatArea, formatPreco } from "@/lib/format"
import type { ImovelWithFotos } from "@/lib/types"

export function PropertyCard({ property }: { property: ImovelWithFotos }) {
  const href = `/imoveis/${property.slug}`
  const oferta = property.finalidade === "aluguel" ? "Para alugar" : "À venda"
  const local = [oferta, property.bairro, property.cidade].filter(Boolean).join(" · ")
  const specs = [
    formatArea(property.area),
    property.quartos != null
      ? `${property.quartos} ${property.quartos === 1 ? "quarto" : "quartos"}`
      : null,
    property.vagas != null
      ? `${property.vagas} ${property.vagas === 1 ? "vaga" : "vagas"}`
      : null,
  ]
    .filter(Boolean)
    .join("  ·  ")

  return (
    <article className="transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(43,36,30,0.08)]">
      <BlueprintFrame className="bg-paper-2">
        <CardGallery
          fotos={property.imovel_fotos ?? []}
          title={property.titulo}
          href={href}
        />

        <Link href={href} className="block">
          <div className="flex flex-col gap-2 px-4 py-4">
            <p className="font-mono text-[11px] tracking-[0.14em] text-sage uppercase">
              {local || property.endereco || tipoLabel(property.tipo)}
            </p>
            <h3 className="font-display text-[22px] leading-snug">{property.titulo}</h3>
            <p className="font-mono text-sm font-medium">{formatPreco(property.preco)}</p>
            <div className="mt-1 flex items-end justify-between gap-3">
              <p className="font-mono text-[11px] text-ink-soft">{specs}</p>
              <span className="font-mono text-[11px] text-brass">Ver →</span>
            </div>
          </div>
        </Link>
      </BlueprintFrame>
    </article>
  )
}
