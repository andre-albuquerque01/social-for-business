import { ReactNode } from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import verifyToken from '@/functions/verify-token'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Alterar post',
  },
}

export default async function Dashboard({ children }: { children: ReactNode }) {
  const cookiesStore = cookies()
  const token = cookiesStore.get('token')?.value
  const verify = await verifyToken(token)
  if (!verify) redirect('/')
  return <div className="mx-auto h-screen max-w-[1200px]">{children}</div>
}
