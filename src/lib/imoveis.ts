import { cache } from "react"

import { VISIBLE_STATUS } from "@/lib/constants"
import { fakeCoord } from "@/lib/coords"
import { MOCK_IMOVEIS } from "@/lib/mock-imoveis"
import { createPublicClient } from "@/lib/supabase"
import type { Imovel, ImovelWithFotos, NeighborhoodStat } from "@/lib/types"

const CATALOG_TIMEOUT_MS = 800

function isVisible(status: string) {
  return (VISIBLE_STATUS as readonly string[]).includes(status)
}

const catalogMode = cache(async (): Promise<"db" | "mock"> => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), CATALOG_TIMEOUT_MS)

  try {
    const supabase = createPublicClient()
    const { count, error } = await supabase
      .from("imoveis")
      .select("id", { count: "exact", head: true })
      .in("status", [...VISIBLE_STATUS])
      .abortSignal(controller.signal)
    if (error || !count) return "mock"
    return "db"
  } catch {
    return "mock"
  } finally {
    clearTimeout(timer)
  }
})

function visibleMocks() {
  return MOCK_IMOVEIS.filter((imovel) => isVisible(imovel.status))
}

function summarizeNeighborhoods(
  rows: Array<{
    bairro: string | null
    cidade: string | null
    preco: number | null
    area: number | null
  }>
): NeighborhoodStat[] {
  const groups = new Map<
    string,
    { cidade: string | null; prices: number[]; count: number }
  >()

  for (const row of rows) {
    const bairro = row.bairro?.trim()
    if (!bairro) continue
    const current = groups.get(bairro) ?? {
      cidade: row.cidade,
      prices: [] as number[],
      count: 0,
    }
    current.count += 1
    if (row.preco != null && row.area != null && row.area > 0) {
      current.prices.push(row.preco / row.area)
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

function similarFrom(all: ImovelWithFotos[], imovel: Imovel) {
  const others = all.filter((item) => item.status === "disponivel" && item.id !== imovel.id)
  const collected: ImovelWithFotos[] = []

  const push = (row: ImovelWithFotos) => {
    if (collected.length >= 3) return
    if (collected.some((item) => item.id === row.id)) return
    collected.push(row)
  }

  if (imovel.bairro) {
    for (const row of others.filter((item) => item.bairro === imovel.bairro)) push(row)
  }

  if (collected.length < 3 && imovel.preco != null) {
    const min = imovel.preco * 0.7
    const max = imovel.preco * 1.3
    for (const row of others) {
      if (row.preco != null && row.preco >= min && row.preco <= max) push(row)
    }
  }

  const recent = [...others].sort((a, b) => b.updated_at.localeCompare(a.updated_at))
  for (const row of recent) push(row)

  return collected.slice(0, 3)
}

const IMOVEL_SELECT = "*, imovel_fotos(*)"

export async function getFeaturedImoveis(): Promise<ImovelWithFotos[]> {
  if ((await catalogMode()) === "mock") {
    return visibleMocks()
      .filter((imovel) => imovel.status === "disponivel")
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
      .slice(0, 6)
  }

  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from("imoveis")
    .select(IMOVEL_SELECT)
    .eq("status", "disponivel")
    .order("updated_at", { ascending: false })
    .limit(6)

  if (error) {
    console.error("getFeaturedImoveis", error.message)
    return []
  }

  return (data ?? []) as ImovelWithFotos[]
}

export async function getActiveCatalog() {
  if ((await catalogMode()) === "mock") {
    const visible = visibleMocks()
    const updatedAt = visible
      .map((imovel) => imovel.updated_at)
      .sort()
      .at(-1) ?? null
    return { count: visible.length, updatedAt }
  }

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
  if ((await catalogMode()) === "mock") {
    return visibleMocks().find((imovel) => imovel.slug === slug) ?? null
  }

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
  if ((await catalogMode()) === "mock") {
    return visibleMocks().map((imovel) => imovel.slug)
  }

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
  if ((await catalogMode()) === "mock") {
    return similarFrom(visibleMocks(), imovel)
  }

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
  if ((await catalogMode()) === "mock") {
    return summarizeNeighborhoods(visibleMocks())
  }

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

  return summarizeNeighborhoods(
    (data ?? []).map((row) => ({
      bairro: row.bairro as string | null,
      cidade: row.cidade as string | null,
      preco: row.preco as number | null,
      area: row.area as number | null,
    }))
  )
}
