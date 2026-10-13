"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { publicFotoUrl } from "@/lib/format"
import { sortedFotos } from "@/lib/fotos"
import type { ImovelFoto } from "@/lib/types"

function Arrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next"
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Foto anterior" : "Próxima foto"}
      className={`absolute top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center border border-brass bg-paper-2/90 text-ink transition-colors hover:bg-brass hover:text-paper-2 ${
        direction === "prev" ? "left-2" : "right-2"
      }`}
    >
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
        {direction === "prev" ? (
          <path
            d="M10 3 5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        ) : (
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        )}
      </svg>
    </button>
  )
}

export function CardGallery({
  fotos,
  title,
  href,
}: {
  fotos: ImovelFoto[]
  title: string
  href: string
}) {
  const ordered = sortedFotos(fotos)
  const [index, setIndex] = useState(0)
  const current = ordered[index]
  const hasMany = ordered.length > 1

  return (
    <div className="graph-paper relative aspect-[4/3] overflow-hidden">
      {current ? (
        <Image
          src={publicFotoUrl(current.storage_path)}
          alt={current.alt || title}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className="object-cover"
        />
      ) : null}

      <Link href={href} className="absolute inset-0 z-[1]" aria-label={title} />

      {hasMany ? (
        <>
          <Arrow
            direction="prev"
            onClick={() =>
              setIndex((currentIndex) =>
                currentIndex === 0 ? ordered.length - 1 : currentIndex - 1
              )
            }
          />
          <Arrow
            direction="next"
            onClick={() =>
              setIndex((currentIndex) =>
                currentIndex === ordered.length - 1 ? 0 : currentIndex + 1
              )
            }
          />
          <p className="pointer-events-none absolute right-2 bottom-2 z-10 bg-ink/55 px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-paper-2">
            {index + 1}/{ordered.length}
          </p>
        </>
      ) : null}
    </div>
  )
}
