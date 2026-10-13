export function publicFotoUrl(storagePath: string) {
  if (storagePath.startsWith("/")) return storagePath
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!base) return ""
  return `${base}/storage/v1/object/public/imoveis/${storagePath}`
}

export function formatPreco(value: number | null | undefined) {
  if (value == null) return "—"
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPrecoM2(preco: number | null | undefined, area: number | null | undefined) {
  if (preco == null || area == null || area <= 0) return "—"
  return `${formatPreco(preco / area)}/m²`
}

export function formatArea(area: number | null | undefined) {
  if (area == null) return "—"
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(area)} m²`
}

export function formatHora(iso: string | null | undefined) {
  if (!iso) return "--:--"
  return new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatCountLabel(count: number) {
  if (count === 1) return "1 imóvel ativo"
  return `${new Intl.NumberFormat("pt-BR").format(count)} imóveis ativos`
}
