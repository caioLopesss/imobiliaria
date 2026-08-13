import type { ImovelFoto } from "@/lib/types"

export function sortedFotos(fotos: ImovelFoto[] | null | undefined) {
  return [...(fotos ?? [])].sort((a, b) => {
    if (a.is_capa !== b.is_capa) return a.is_capa ? -1 : 1
    return a.ordem - b.ordem
  })
}

export function capaFoto(fotos: ImovelFoto[] | null | undefined) {
  return sortedFotos(fotos)[0] ?? null
}
