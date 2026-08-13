import { cn } from "@/lib/cn"

export function Logo({
  inverted = false,
  className,
}: {
  inverted?: boolean
  className?: string
}) {
  return (
    <span className={cn("inline-flex h-[46px] items-center", className)}>
      {/* Coloque o arquivo em /public/sigma-logo.png para substituir o wordmark. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sigma-logo.png"
        alt="Sigma Imóveis"
        height={46}
        className={cn(
          "h-[46px] w-auto max-w-[180px] object-contain object-left",
          inverted && "brightness-0 invert"
        )}
        onError={(event) => {
          event.currentTarget.style.display = "none"
          const fallback = event.currentTarget.nextElementSibling
          if (fallback instanceof HTMLElement) fallback.hidden = false
        }}
      />
      <span
        hidden
        className={cn(
          "font-display text-[28px] tracking-[0.12em]",
          inverted ? "text-paper-2" : "text-ink"
        )}
      >
        SIGMA
      </span>
    </span>
  )
}
