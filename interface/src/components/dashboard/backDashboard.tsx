'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const BackDashboardComponent = () => {
  const pathName = usePathname()
  console.log(pathName)

  if (pathName !== '/dashboard') {
    return (
      <Link
        href={`/dashboard`}
        className="text-center w-40 py-2 border border-zinc-600 transform duration-500 hover:bg-zinc-900 rounded-md"
      >
        Inicio
      </Link>
    )
  } else return null
}
