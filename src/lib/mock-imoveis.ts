import type { ImovelFoto, ImovelWithFotos } from "@/lib/types"

const CIDADE = "São João del Rei"

function fotos(imovelId: string, slug: string, alts: string[]): ImovelFoto[] {
  return alts.map((alt, index) => ({
    id: `${imovelId}-foto-${index + 1}`,
    imovel_id: imovelId,
    storage_path: `/casas/${slug}/0${index + 1}.jpg`,
    alt,
    ordem: index,
    is_capa: index === 0,
    created_at: "2026-10-13T13:40:00.000Z",
  }))
}

function casa(
  partial: Omit<ImovelWithFotos, "cidade" | "finalidade" | "tipo" | "status" | "created_at" | "imovel_fotos"> & {
    fotos: string[]
  }
): ImovelWithFotos {
  const { fotos: alts, ...imovel } = partial
  return {
    ...imovel,
    cidade: CIDADE,
    finalidade: "venda",
    tipo: "casa",
    status: "disponivel",
    created_at: "2026-10-01T12:00:00.000Z",
    imovel_fotos: fotos(imovel.id, imovel.slug, alts),
  }
}

export const MOCK_IMOVEIS: ImovelWithFotos[] = [
  casa({
    id: "mock-casa-centro-historico",
    titulo: "Casa com quintal no Centro",
    slug: "casa-centro-historico",
    descricao:
      "Casa de dois pavimentos, com varanda, jardim e área de lazer nos fundos. A sala abre para o pátio e os quartos ficam no andar de cima, com luz da tarde.",
    preco: 890000,
    quartos: 4,
    banheiros: 3,
    vagas: 2,
    area: 214,
    endereco: "Rua Getúlio Vargas, 418",
    bairro: "Centro",
    updated_at: "2026-10-13T13:40:00.000Z",
    fotos: [
      "Fachada da casa à venda no Centro",
      "Sala de estar da casa no Centro",
      "Cozinha da casa no Centro",
      "Suíte da casa no Centro",
    ],
  }),
  casa({
    id: "mock-casa-ladeira-centro",
    titulo: "Casa da ladeira",
    slug: "casa-ladeira-centro",
    descricao:
      "Casa com varanda frontal, telhado em duas águas e jardim. Os três quartos se organizam em torno da sala, com cozinha integrada e uma vaga na lateral.",
    preco: 620000,
    quartos: 3,
    banheiros: 2,
    vagas: 1,
    area: 156,
    endereco: "Ladeira do Rosário, 77",
    bairro: "Centro",
    updated_at: "2026-10-12T11:15:00.000Z",
    fotos: [
      "Fachada da casa à venda na Ladeira do Rosário",
      "Sala da casa na Ladeira do Rosário",
      "Cozinha da casa na Ladeira do Rosário",
      "Quarto da casa na Ladeira do Rosário",
    ],
  }),
  casa({
    id: "mock-sobrado-matosinhos",
    titulo: "Sobrado em Matosinhos",
    slug: "sobrado-matosinhos",
    descricao:
      "Sobrado com pé-direito alto, lareira e jardim na frente. A sala de jantar fica junto à cozinha, e os quartos ocupam o pavimento superior.",
    preco: 745000,
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    area: 188,
    endereco: "Rua Padre José Maria Xavier, 92",
    bairro: "Matosinhos",
    updated_at: "2026-10-11T16:05:00.000Z",
    fotos: [
      "Fachada do sobrado à venda em Matosinhos",
      "Sala do sobrado em Matosinhos",
      "Cozinha do sobrado em Matosinhos",
      "Quarto do sobrado em Matosinhos",
    ],
  }),
  casa({
    id: "mock-casa-jardim-matosinhos",
    titulo: "Casa com jardim",
    slug: "casa-jardim-matosinhos",
    descricao:
      "Casa térrea ampliada, com estar integrado, cozinha aberta para o jardim e quatro quartos. Duas vagas cobertas ficam na lateral do lote.",
    preco: 980000,
    quartos: 4,
    banheiros: 3,
    vagas: 2,
    area: 240,
    endereco: "Rua Marechal Deodoro, 310",
    bairro: "Matosinhos",
    updated_at: "2026-10-10T09:30:00.000Z",
    fotos: [
      "Fachada da casa com jardim em Matosinhos",
      "Estar da casa com jardim",
      "Cozinha da casa com jardim",
      "Quarto da casa com jardim",
    ],
  }),
  casa({
    id: "mock-casa-bonfim",
    titulo: "Casa no Bonfim",
    slug: "casa-bonfim",
    descricao:
      "Casa de esquina com garagem, sala de estar e três quartos. O lote tem recuo frontal e um quintal curto nos fundos, bom para quem quer ficar no bairro.",
    preco: 515000,
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    area: 132,
    endereco: "Rua do Bonfim, 155",
    bairro: "Bonfim",
    updated_at: "2026-10-09T18:20:00.000Z",
    fotos: [
      "Fachada da casa à venda no Bonfim",
      "Sala da casa no Bonfim",
      "Cozinha da casa no Bonfim",
      "Quarto da casa no Bonfim",
    ],
  }),
  casa({
    id: "mock-residencia-colonia-do-marcal",
    titulo: "Residência na Colônia do Marçal",
    slug: "residencia-colonia-do-marcal",
    descricao:
      "Residência de cinco quartos, com área de lazer, piscina e três vagas. Os ambientes sociais ficam no térreo, abertos para o quintal.",
    preco: 1380000,
    quartos: 5,
    banheiros: 4,
    vagas: 3,
    area: 340,
    endereco: "Rua Coronel Tamarindo, 740",
    bairro: "Colônia do Marçal",
    updated_at: "2026-10-08T14:00:00.000Z",
    fotos: [
      "Fachada da residência à venda na Colônia do Marçal",
      "Estar da residência na Colônia do Marçal",
      "Cozinha da residência na Colônia do Marçal",
      "Sala da residência na Colônia do Marçal",
    ],
  }),
]
