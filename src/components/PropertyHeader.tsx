import { formatPreco, formatPrecoM2 } from "@/lib/format"
import type { Imovel } from "@/lib/types"

export function PropertyHeader({ imovel }: { imovel: Imovel }) {
  const address = [imovel.endereco, imovel.bairro, imovel.cidade]
    .filter(Boolean)
    .join(" · ")

  return (
    <div className="flex flex-col gap-6 border-b border-line py-8 site:flex-row site:items-end site:justify-between">
      <div>
        <h1 className="font-display text-[32px] leading-tight typo:text-[38px]">
          {imovel.titulo}
        </h1>
        {address ? (
          <p className="mt-3 font-mono text-[12px] tracking-wide text-ink-soft uppercase">
            {address}
          </p>
        ) : null}
      </div>
      <div className="site:text-right">
        <p className="font-mono text-[28px] font-medium tracking-tight">
          {formatPreco(imovel.preco)}
        </p>
        <p className="mt-1 font-mono text-[12px] text-ink-soft">
          {formatPrecoM2(imovel.preco, imovel.area)}
        </p>
      </div>
    </div>
  )
}
