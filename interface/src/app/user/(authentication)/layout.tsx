import verifyToken from '@/functions/verify-token'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Usuário',
}
export default async function Layout({ children }: { children: ReactNode }) {
  const cookiesStore = cookies()
  const token = cookiesStore.get('token')!.value
  const verify = await verifyToken(token)
  if (!verify) redirect('/')
  return <div className="mx-auto h-screen max-w-[1200px]">{children}</div>
}
