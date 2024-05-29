'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function Login(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const email = request.get('email') as string | null
  const password = request.get('password') as string | null

  const cookiesStore = cookies()

  try {
    if (!email || !password) throw new Error('Preenchas os dados!')

    const response = await ApiAction('/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()

    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message)

    if (message.includes('E-mail não verificado')) {
      throw new Error('E-mail não verificado!')
    }
    if (message.includes('Email or password incorrect')) {
      throw new Error('E-mail ou senha invalida!')
    }
    if (message.includes('Email not registered')) {
      throw new Error('E-mail não registrado!')
    }

    cookiesStore.set('token', data.access_token, {
      expires: Date.now() + 2 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    })

    if (!response.ok) throw new Error('Usuário ou senha inválido!')
  } catch (error) {
    return apiError(error)
  }
  redirect('/dashboard')
}
