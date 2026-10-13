import { breadcrumbFinalidade } from "@/lib/constants"

export function Breadcrumb({
  finalidade,
  bairro,
  endereco,
}: {
  finalidade: string
  bairro: string | null
  endereco: string | null
}) {
  const parts = [
    breadcrumbFinalidade(finalidade),
    bairro,
    endereco,
  ].filter(Boolean) as string[]

  return (
    <nav aria-label="Trilha de navegação" className="font-mono text-[12px] text-ink-soft">
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {index > 0 ? <span className="mx-2 text-brass">›</span> : null}
          {part}
        </span>
      ))}
    </nav>
  )
}
