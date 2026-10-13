import type { Metadata } from "next"
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google"

import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
})

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
})

export const metadata: Metadata = {
  title: {
    default: "Sigma Imóveis",
    template: "%s · Sigma Imóveis",
  },
  description: "Encontre o seu endereço em São João del Rei. Catálogo Sigma Imóveis.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${fraunces.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
