export const FINALIDADES = ["venda", "aluguel"] as const
export const TIPOS = [
  "apartamento",
  "casa",
  "terreno",
  "comercial",
  "outro",
] as const
export const VISIBLE_STATUS = ["disponivel", "reservado"] as const

export type Finalidade = (typeof FINALIDADES)[number]
export type TipoImovel = (typeof TIPOS)[number]

export const FINALIDADE_LABELS: Record<Finalidade, string> = {
  venda: "Venda",
  aluguel: "Aluguel",
}

export const TIPO_LABELS: Record<TipoImovel, string> = {
  apartamento: "Apartamento",
  casa: "Casa",
  terreno: "Terreno",
  comercial: "Comercial",
  outro: "Outro",
}

export const STORAGE_BUCKET = "imoveis"

export function tipoLabel(tipo: string) {
  return TIPO_LABELS[tipo as TipoImovel] ?? tipo
}

export function finalidadeLabel(finalidade: string) {
  return FINALIDADE_LABELS[finalidade as Finalidade] ?? finalidade
}

export function breadcrumbFinalidade(finalidade: string) {
  return finalidade === "aluguel" ? "Alugar" : "Comprar"
}
