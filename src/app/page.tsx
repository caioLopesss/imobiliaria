import { ArticleGrid } from "@/components/ArticleGrid"
import { Container } from "@/components/Container"
import { CtaBanner } from "@/components/CtaBanner"
import { Hero } from "@/components/Hero"
import { NeighborhoodGrid } from "@/components/NeighborhoodGrid"
import { PropertyCard } from "@/components/PropertyCard"
import { SectionHead } from "@/components/SectionHead"
import { StatusStrip } from "@/components/StatusStrip"
import { ARTICLES } from "@/lib/articles"
import { getActiveCatalog, getFeaturedImoveis, getNeighborhoods } from "@/lib/imoveis"

export const revalidate = 60

export default async function HomePage() {
  const [featured, catalog, neighborhoods] = await Promise.all([
    getFeaturedImoveis(),
    getActiveCatalog(),
    getNeighborhoods(),
  ])

  return (
    <>
      <Hero />

      <Container className="py-6">
        <StatusStrip count={catalog.count} updatedAt={catalog.updatedAt} />
      </Container>

      <section id="selecao" className="border-t border-line py-14 typo:py-16">
        <Container>
          <SectionHead title="Seleção atual" href="/#selecao" />
          {featured.length ? (
            <div className="grid grid-cols-1 gap-6 site:grid-cols-3">
              {featured.map((imovel) => (
                <PropertyCard key={imovel.id} property={imovel} />
              ))}
            </div>
          ) : (
            <div className="graph-paper border border-line px-6 py-16 text-center">
              <p className="font-display text-[22px]">Nenhum imóvel publicado ainda</p>
              <p className="mt-2 text-sm text-ink-soft">
                O catálogo aparece aqui assim que o CMS publicar um imóvel disponível.
              </p>
            </div>
          )}
        </Container>
      </section>

      {neighborhoods.length ? (
        <section id="onde-morar" className="border-t border-line py-14 typo:py-16">
          <Container>
            <SectionHead title="Onde morar" href="/#onde-morar" />
            <NeighborhoodGrid neighborhoods={neighborhoods} />
          </Container>
        </section>
      ) : null}

      <section id="panorama" className="border-t border-line py-14 typo:py-16">
        <Container>
          <SectionHead title="Panorama" href="/#panorama" linkLabel="Ler mais →" />
          <ArticleGrid articles={ARTICLES} />
        </Container>
      </section>

      <CtaBanner />
    </>
  )
}
