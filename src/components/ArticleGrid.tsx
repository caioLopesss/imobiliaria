import Link from "next/link"

import type { Article } from "@/lib/types"

export function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 site:grid-cols-3 site:gap-10">
      {articles.map((article) => (
        <article key={article.titulo} className="border-t border-line pt-5">
          <p className="font-mono text-[11px] tracking-[0.16em] text-sage uppercase">
            {article.categoria}
          </p>
          <h3 className="font-display mt-3 text-[22px] leading-snug">
            <Link href={article.href} className="hover:text-brass">
              {article.titulo}
            </Link>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {article.resumo}
          </p>
        </article>
      ))}
    </div>
  )
}
