"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Container } from "@/components/Container"
import { Logo } from "@/components/Logo"
import { cn } from "@/lib/cn"

const NAV = [
  { href: "/#selecao", label: "Comprar" },
  { href: "/#selecao", label: "Alugar" },
  { href: "/#selecao", label: "Lançamentos" },
  { href: "/#onde-morar", label: "Bairros" },
  { href: "/#panorama", label: "Sobre" },
]

export function Header() {
  const overHero = usePathname() === "/"

  return (
    <header
      className={cn(
        "z-30 w-full",
        overHero
          ? "absolute inset-x-0 top-0"
          : "relative border-b border-line bg-paper"
      )}
    >
      {overHero ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[200px] bg-linear-to-b from-ink/80 via-ink/40 to-transparent"
        />
      ) : null}

      <Container className="relative flex min-h-[76px] items-center justify-between gap-4 py-2.5">
        <Link href="/" aria-label="Sigma Imóveis — início" className="shrink-0">
          <Logo />
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-7 text-sm site:flex",
            overHero ? "text-paper-2" : "text-ink"
          )}
        >
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-brass"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <details className="site:hidden">
            <summary
              className={cn(
                "cursor-pointer list-none font-mono text-[11px] tracking-[0.14em] uppercase [&::-webkit-details-marker]:hidden",
                overHero ? "text-paper-2" : "text-ink-soft"
              )}
            >
              Menu
            </summary>
            <div className="absolute top-[76px] right-5 left-5 z-20 border border-line bg-paper-2 p-4">
              <nav className="flex flex-col gap-3 text-sm text-ink">
                {NAV.map((item) => (
                  <Link key={item.label} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </details>
          <Link
            href="/#conversa"
            className={cn(
              "px-4 py-2.5 font-sans text-sm transition-colors",
              overHero
                ? "bg-brass text-paper-2 hover:bg-paper-2 hover:text-ink"
                : "bg-ink text-paper-2 hover:bg-brass"
            )}
          >
            Fale com um corretor
          </Link>
        </div>
      </Container>
    </header>
  )
}
