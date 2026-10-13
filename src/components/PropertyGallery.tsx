import Image from "next/image"

import { publicFotoUrl } from "@/lib/format"
import { sortedFotos } from "@/lib/fotos"
import type { ImovelFoto } from "@/lib/types"

function Slot({
  foto,
  title,
  className,
  sizes,
}: {
  foto?: ImovelFoto
  title: string
  className?: string
  sizes: string
}) {
  return (
    <div className={`graph-paper relative overflow-hidden border border-line ${className ?? ""}`}>
      {foto ? (
        <Image
          src={publicFotoUrl(foto.storage_path)}
          alt={foto.alt || title}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : null}
    </div>
  )
}

export function PropertyGallery({
  fotos,
  title,
}: {
  fotos: ImovelFoto[]
  title: string
}) {
  const ordered = sortedFotos(fotos)
  const main = ordered[0]
  const thumbs = [ordered[1], ordered[2], ordered[3]]

  return (
    <div className="grid grid-cols-1 gap-2 site:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)] site:gap-3">
      <Slot
        foto={main}
        title={title}
        className="min-h-[240px] aspect-[4/3] site:min-h-[420px] site:aspect-auto"
        sizes="(max-width: 900px) 100vw, 70vw"
      />
      <div className="grid grid-cols-3 gap-2 site:grid-cols-1 site:gap-3">
        {thumbs.map((foto, index) => (
          <Slot
            key={foto?.id ?? `placeholder-${index}`}
            foto={foto}
            title={title}
            className="aspect-[4/3] site:min-h-0 site:aspect-auto site:h-full"
            sizes="(max-width: 900px) 30vw, 22vw"
          />
        ))}
      </div>
    </div>
  )
}
