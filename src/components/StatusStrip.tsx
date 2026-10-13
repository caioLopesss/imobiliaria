import { formatCountLabel, formatHora } from "@/lib/format"

export function StatusStrip({
  count,
  updatedAt,
}: {
  count: number
  updatedAt: string | null
}) {
  return (
    <p className="font-mono text-[12px] tracking-wide text-ink-soft">
      <span className="mr-2 inline-block text-sage" aria-hidden>
        ●
      </span>
      {formatCountLabel(count)} — catálogo atualizado às {formatHora(updatedAt)}
    </p>
  )
}
