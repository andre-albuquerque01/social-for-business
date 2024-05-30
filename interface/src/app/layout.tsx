import { fontBody } from '@/functions/font/fonts'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jesus is love',
  description: 'He loves me',
  authors: [{ name: 'André', url: 'https://ae.dev.br' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className={fontBody.className}>
      <body className="bg-slate-800">{children}</body>
    </html>
  )
}
