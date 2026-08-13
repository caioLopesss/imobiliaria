export type Imovel = {
  id: string
  titulo: string
  slug: string
  descricao: string | null
  preco: number | null
  finalidade: string
  tipo: string
  quartos: number | null
  banheiros: number | null
  vagas: number | null
  area: number | null
  endereco: string | null
  bairro: string | null
  cidade: string | null
  status: string
  created_at: string
  updated_at: string
}

export type ImovelFoto = {
  id: string
  imovel_id: string
  storage_path: string
  alt: string | null
  ordem: number
  is_capa: boolean
  created_at: string
}

export type ImovelWithFotos = Imovel & {
  imovel_fotos: ImovelFoto[]
}

export type NeighborhoodStat = {
  bairro: string
  cidade: string | null
  coord: string
  precoM2: number | null
  count: number
}

export type Article = {
  categoria: string
  titulo: string
  resumo: string
  href: string
}
