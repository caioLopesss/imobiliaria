import Link from "next/link"

import { Container } from "@/components/Container"
import { Logo } from "@/components/Logo"

export function Footer() {
  return (
    <footer className="bg-ink text-paper-2">
      <Container className="grid grid-cols-2 gap-10 py-14 site:grid-cols-4">
        <div className="col-span-2 site:col-span-1">
          <Logo inverted />
          <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-paper-2/70">
            Endereços com leitura de planta. São João del Rei, em escala humana.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">
            Comprar
          </p>
          <ul className="mt-4 space-y-2 text-sm text-paper-2/80">
            <li>
              <Link href="/#selecao" className="hover:text-paper-2">
                Imóveis à venda
              </Link>
            </li>
            <li>
              <Link href="/#selecao" className="hover:text-paper-2">
                Para alugar
              </Link>
            </li>
            <li>
              <Link href="/#onde-morar" className="hover:text-paper-2">
                Bairros
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">
            Institucional
          </p>
          <ul className="mt-4 space-y-2 text-sm text-paper-2/80">
            <li>
              <Link href="/#panorama" className="hover:text-paper-2">
                Sobre a Sigma
              </Link>
            </li>
            <li>
              <Link href="/#panorama" className="hover:text-paper-2">
                Panorama
              </Link>
            </li>
            <li>
              <Link href="/#conversa" className="hover:text-paper-2">
                Trabalhe conosco
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">
            Contato
          </p>
          <ul className="mt-4 space-y-2 font-mono text-sm text-paper-2/80">
            <li>São João del Rei — MG</li>
            <li>
              <a href="mailto:contato@sigmaimoveis.com.br" className="hover:text-paper-2">
                contato@sigmaimoveis.com.br
              </a>
            </li>
            <li>
              <a href="tel:+553232000000" className="hover:text-paper-2">
                +55 32 3200-0000
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 font-mono text-[11px] tracking-wide text-paper-2/50 typo:flex-row typo:justify-between">
          <p>© {new Date().getFullYear()} Sigma Imóveis. Todos os direitos reservados.</p>
          <p>CRECI-MG 00000-J</p>
        </Container>
      </div>
    </footer>
  )
}
