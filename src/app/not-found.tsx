import Link from "next/link"

import { Container } from "@/components/Container"

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">
        404
      </p>
      <h1 className="font-display mt-4 text-[36px]">Endereço não encontrado</h1>
      <p className="mt-3 text-ink-soft">
        Este imóvel não está no catálogo visível, ou a página não existe.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-ink px-5 py-3 text-sm text-paper-2 hover:bg-brass"
      >
        Voltar à home
      </Link>
    </Container>
  )
}
