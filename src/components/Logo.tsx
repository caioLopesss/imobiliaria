import { cn } from "@/lib/cn"

function SigmaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 42"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M41 7H7L24 21 7 35H41"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinejoin="miter"
        strokeLinecap="butt"
        strokeMiterlimit="8"
      />
    </svg>
  )
}

export function Logo({
  inverted = false,
  className,
}: {
  inverted?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center leading-none",
        inverted ? "text-paper-2" : "text-brass",
        className
      )}
    >
      <SigmaMark className="h-[26px] w-auto" />
      <span className="mt-1.5 font-sans text-[12px] font-semibold tracking-[0.22em]">
        SIGMA
      </span>
      <span className="mt-1 font-sans text-[7.5px] font-normal tracking-[0.46em]">
        IMÓVEIS
      </span>
    </span>
  )
}
