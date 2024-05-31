'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function Logout() {
  try {
    cookies().delete('token')
    redirect('/')
  } catch (error) {
    console.error(error)
  }
}
