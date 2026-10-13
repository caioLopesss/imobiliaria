import Link from "next/link"

export function CtaBanner() {
  return (
    <section id="conversa" className="bg-ink">
      <div className="mx-auto flex max-w-[720px] flex-col items-center px-5 py-16 text-center typo:py-20">
        <h2 className="font-display text-[28px] leading-tight text-paper-2 typo:text-[36px]">
          Pronto para encontrar seu endereço?
        </h2>
        <Link
          href="mailto:contato@sigmaimoveis.com.br"
          className="mt-8 bg-brass px-6 py-3 font-sans text-sm text-paper-2 transition-colors hover:bg-paper-2 hover:text-ink"
        >
          Agendar uma conversa
        </Link>
      </div>
    </section>
  )
}
