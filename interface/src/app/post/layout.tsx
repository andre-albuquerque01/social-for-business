import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Alterar post',
  },
}

export default function Dashboard({ children }: { children: ReactNode }) {
  return <div className="mx-auto h-screen max-w-[1200px]">{children}</div>
}
