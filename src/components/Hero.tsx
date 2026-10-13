import Image from "next/image"

import { Container } from "@/components/Container"
import { SearchBar } from "@/components/SearchBar"

export function Hero() {
  return (
    <section className="relative h-[640px] overflow-hidden typo:h-[700px] site:h-[760px]">
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/45" />

      <div className="relative flex h-full items-center pt-[76px]">
        <Container>
          <p className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-brass uppercase">
            <span aria-hidden className="inline-block h-px w-[26px] bg-brass" />
            Sigma Imóveis · São João del Rei
          </p>

          <h1 className="font-display max-w-[16ch] text-[40px] leading-[1.05] text-paper-2 site:text-[68px]">
            Encontre
            <br />
            <em className="text-brass italic">o seu endereço.</em>
          </h1>

          <SearchBar />
        </Container>
      </div>
    </section>
  )
}
