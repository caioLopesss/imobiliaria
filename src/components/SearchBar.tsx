"use client"

import { useState } from "react"

import { BlueprintFrame } from "@/components/BlueprintFrame"
import { cn } from "@/lib/cn"

const TABS = ["Comprar", "Alugar", "Vender"] as const

export function SearchBar() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Comprar")

  return (
    <div className="mt-8 max-w-[640px]">
      <div className="mb-4 flex gap-6 font-mono text-[12px] tracking-[0.12em] uppercase">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              "pb-1 transition-colors",
              tab === item
                ? "text-ink underline decoration-brass decoration-2 underline-offset-8"
                : "text-ink-soft hover:text-ink"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <BlueprintFrame>
        <form
          className="flex flex-col gap-0 typo:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="busca-imovel">
            Buscar imóvel
          </label>
          <input
            id="busca-imovel"
            name="q"
            placeholder="Cidade, bairro, endereço ou código do imóvel"
            className="min-h-[56px] flex-1 bg-paper-2 px-4 font-sans text-sm text-ink placeholder:text-ink-soft/70"
          />
          <button
            type="submit"
            className="bg-ink px-6 py-4 font-sans text-sm text-paper-2 transition-colors hover:bg-brass"
          >
            Buscar →
          </button>
        </form>
      </BlueprintFrame>
    </div>
  )
}
