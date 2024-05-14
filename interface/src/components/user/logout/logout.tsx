'use client'
import { Logout } from '@/actions/user/logout'
import { useRouter } from 'next/navigation'

export const LogoutComponent = () => {
  const router = useRouter()
  async function handleLogout() {
    await Logout()
    router.push('/')
  }

  return (
    <button
      onClick={handleLogout}
      className="py-2 w-40 border border-zinc-600 transform duration-500 hover:bg-zinc-900 rounded-md"
    >
      Sair
    </button>
  )
}
