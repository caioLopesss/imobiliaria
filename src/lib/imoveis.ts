import { VISIBLE_STATUS } from "@/lib/constants"
import { fakeCoord } from "@/lib/coords"
import { createPublicClient } from "@/lib/supabase"
import type { Imovel, ImovelWithFotos, NeighborhoodStat } from "@/lib/types"

const IMOVEL_SELECT = "*, imovel_fotos(*)"

export async function getFeaturedImoveis(): Promise<ImovelWithFotos[]> {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from("imoveis")
    .select(IMOVEL_SELECT)
    .eq("status", "disponivel")
    .order("updated_at", { ascending: false })
    .limit(3)

  if (error) {
    console.error("getFeaturedImoveis", error.message)
    return []
  }

  return (data ?? []) as ImovelWithFotos[]
}

export async function getActiveCatalog() {
  const supabase = createPublicClient()
  const { data, count, error } = await supabase
    .from("imoveis")
    .select("updated_at", { count: "exact" })
    .in("status", [...VISIBLE_STATUS])
    .order("updated_at", { ascending: false })
    .limit(1)

  if (error) {
    console.error("getActiveCatalog", error.message)
    return { count: 0, updatedAt: null as string | null }
  }

  return {
    count: count ?? 0,
    updatedAt: data?.[0]?.updated_at ?? null,
  }
}

export async function getImovelBySlug(slug: string): Promise<ImovelWithFotos | null> {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from("imoveis")
    .select(IMOVEL_SELECT)
    .eq("slug", slug)
    .in("status", [...VISIBLE_STATUS])
    .maybeSingle()

  if (error) {
    console.error("getImovelBySlug", error.message)
    return null
  }

  return (data as ImovelWithFotos | null) ?? null
}

export async function getVisibleSlugs() {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from("imoveis")
    .select("slug")
    .in("status", [...VISIBLE_STATUS])

  if (error) {
    console.error("getVisibleSlugs", error.message)
    return []
  }

  return (data ?? []).map((row) => row.slug as string)
}

export async function getSimilarImoveis(
  imovel: Imovel
): Promise<ImovelWithFotos[]> {
  const supabase = createPublicClient()
  const collected = new Map<string, ImovelWithFotos>()

  if (imovel.bairro) {
    const { data, error } = await supabase
      .from("imoveis")
      .select(IMOVEL_SELECT)
      .eq("status", "disponivel")
      .eq("bairro", imovel.bairro)
      .neq("id", imovel.id)
      .limit(3)

    if (error) console.error("getSimilarImoveis bairro", error.message)
    for (const row of (data ?? []) as ImovelWithFotos[]) {
      collected.set(row.id, row)
    }
  }

  if (collected.size < 3 && imovel.preco != null) {
    const { data, error } = await supabase
      .from("imoveis")
      .select(IMOVEL_SELECT)
      .eq("status", "disponivel")
      .neq("id", imovel.id)
      .gte("preco", imovel.preco * 0.7)
      .lte("preco", imovel.preco * 1.3)
      .limit(6)

    if (error) console.error("getSimilarImoveis preco", error.message)
    for (const row of (data ?? []) as ImovelWithFotos[]) {
      if (collected.size >= 3) break
      collected.set(row.id, row)
    }
  }

  if (collected.size < 3) {
    const { data, error } = await supabase
      .from("imoveis")
      .select(IMOVEL_SELECT)
      .eq("status", "disponivel")
      .neq("id", imovel.id)
      .order("updated_at", { ascending: false })
      .limit(3)

    if (error) console.error("getSimilarImoveis fallback", error.message)
    for (const row of (data ?? []) as ImovelWithFotos[]) {
      if (collected.size >= 3) break
      collected.set(row.id, row)
    }
  }

  return [...collected.values()].slice(0, 3)
}

export async function getNeighborhoods(): Promise<NeighborhoodStat[]> {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from("imoveis")
    .select("bairro, cidade, preco, area")
    .in("status", [...VISIBLE_STATUS])
    .not("bairro", "is", null)

  if (error) {
    console.error("getNeighborhoods", error.message)
    return []
  }

  const groups = new Map<
    string,
    { cidade: string | null; prices: number[]; count: number }
  >()

  for (const row of data ?? []) {
    const bairro = (row.bairro as string | null)?.trim()
    if (!bairro) continue
    const current = groups.get(bairro) ?? {
      cidade: (row.cidade as string | null) ?? null,
      prices: [] as number[],
      count: 0,
    }
    current.count += 1
    const preco = row.preco as number | null
    const area = row.area as number | null
    if (preco != null && area != null && area > 0) {
      current.prices.push(preco / area)
    }
    groups.set(bairro, current)
  }

  return [...groups.entries()]
    .map(([bairro, value]) => ({
      bairro,
      cidade: value.cidade,
      coord: fakeCoord(bairro),
      precoM2:
        value.prices.length > 0
          ? value.prices.reduce((sum, n) => sum + n, 0) / value.prices.length
          : null,
      count: value.count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)
}
