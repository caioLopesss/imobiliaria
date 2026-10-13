"use client"

import { useState } from "react"

import { BlueprintFrame } from "@/components/BlueprintFrame"

export function ContactCard({ imovelTitulo }: { imovelTitulo: string }) {
  const [sent, setSent] = useState(false)

  return (
    <BlueprintFrame className="bg-paper-2 p-5">
      <h2 className="font-display text-[22px]">Agende uma visita</h2>
      <p className="mt-1 font-mono text-[11px] text-ink-soft">{imovelTitulo}</p>

      {sent ? (
        <p className="mt-6 text-sm text-ink-soft">
          Recebemos seu pedido. A equipe Sigma retorna em breve.
        </p>
      ) : (
        <form
          className="mt-5 flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault()
            setSent(true)
          }}
        >
          <label className="sr-only" htmlFor="visita-nome">
            Nome
          </label>
          <input
            id="visita-nome"
            name="nome"
            required
            placeholder="Nome"
            className="border border-line bg-paper px-3 py-2.5 font-sans text-sm placeholder:text-ink-soft/70"
          />
          <label className="sr-only" htmlFor="visita-telefone">
            Telefone
          </label>
          <input
            id="visita-telefone"
            name="telefone"
            required
            placeholder="Telefone"
            className="border border-line bg-paper px-3 py-2.5 font-sans text-sm placeholder:text-ink-soft/70"
          />
          <label className="sr-only" htmlFor="visita-mensagem">
            Mensagem
          </label>
          <textarea
            id="visita-mensagem"
            name="mensagem"
            rows={4}
            placeholder="Mensagem"
            className="resize-y border border-line bg-paper px-3 py-2.5 font-sans text-sm placeholder:text-ink-soft/70"
          />
          <button
            type="submit"
            className="bg-ink px-4 py-3 font-sans text-sm text-paper-2 transition-colors hover:bg-brass"
          >
            Quero visitar →
          </button>
        </form>
      )}
    </BlueprintFrame>
  )
}
