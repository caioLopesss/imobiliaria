import Link from "next/link"

export function SectionHead({
  title,
  href,
  linkLabel = "Ver todos →",
}: {
  title: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <h2 className="font-display text-[28px] leading-tight typo:text-[32px]">
        {title}
      </h2>
      {href ? (
        <Link
          href={href}
          className="font-sans text-sm text-brass underline decoration-brass underline-offset-4"
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  )
}
