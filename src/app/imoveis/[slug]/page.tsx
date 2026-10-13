import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AgentCard } from "@/components/AgentCard"
import { Breadcrumb } from "@/components/Breadcrumb"
import { ContactCard } from "@/components/ContactCard"
import { Container } from "@/components/Container"
import { FloorPlanDiagram } from "@/components/FloorPlanDiagram"
import { PropertyCard } from "@/components/PropertyCard"
import { PropertyGallery } from "@/components/PropertyGallery"
import { PropertyHeader } from "@/components/PropertyHeader"
import { PropertySpecs } from "@/components/PropertySpecs"
import { SectionHead } from "@/components/SectionHead"
import {
  getImovelBySlug,
  getSimilarImoveis,
  getVisibleSlugs,
} from "@/lib/imoveis"

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getVisibleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const imovel = await getImovelBySlug(slug)
  if (!imovel) return { title: "Imóvel" }

  return {
    title: imovel.titulo,
    description: imovel.descricao?.slice(0, 160) ?? imovel.titulo,
  }
}

export default async function ImovelPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const imovel = await getImovelBySlug(slug)
  if (!imovel) notFound()

  const similares = await getSimilarImoveis(imovel)

  return (
    <Container className="py-8 typo:py-10">
      <Breadcrumb
        finalidade={imovel.finalidade}
        bairro={imovel.bairro}
        endereco={imovel.endereco}
      />

      <div className="mt-6">
        <PropertyGallery fotos={imovel.imovel_fotos ?? []} title={imovel.titulo} />
      </div>

      <PropertyHeader imovel={imovel} />
      <PropertySpecs imovel={imovel} />

      <div className="grid grid-cols-1 gap-12 py-10 site:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] site:gap-14">
        <div>
          {imovel.descricao ? (
            <section>
              <h2 className="font-display text-[22px]">Sobre o imóvel</h2>
              <p className="mt-4 max-w-[580px] text-base leading-relaxed text-ink-soft whitespace-pre-wrap">
                {imovel.descricao}
              </p>
            </section>
          ) : null}

          <section className="mt-10">
            <h2 className="font-display mb-4 text-[22px]">Planta baixa</h2>
            <FloorPlanDiagram
              area={imovel.area}
              quartos={imovel.quartos}
              titulo={imovel.titulo}
            />
          </section>
        </div>

        <aside className="site:sticky site:top-[70px] site:self-start">
          <ContactCard imovelTitulo={imovel.titulo} />
          <AgentCard />
        </aside>
      </div>

      {similares.length ? (
        <section className="border-t border-line py-12">
          <SectionHead title="Imóveis parecidos" href="/#selecao" />
          <div className="grid grid-cols-1 gap-6 site:grid-cols-3">
            {similares.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  )
}
