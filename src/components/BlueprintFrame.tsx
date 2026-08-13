import { cn } from "@/lib/cn"

export function BlueprintFrame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 h-3.5 w-3.5 border-t-[1.5px] border-l-[1.5px] border-brass"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 z-10 h-3.5 w-3.5 border-t-[1.5px] border-r-[1.5px] border-brass"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-3.5 w-3.5 border-b-[1.5px] border-l-[1.5px] border-brass"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 z-10 h-3.5 w-3.5 border-r-[1.5px] border-b-[1.5px] border-brass"
      />
      {children}
    </div>
  )
}
