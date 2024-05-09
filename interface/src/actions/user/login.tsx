'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'

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
        // 'Content-Type': 'application/json',
      },
      body: request,
    })

    const data = await response.json()

    cookiesStore.set('token', data.access_token, {
      expires: Date.now() + 2 * 60 * 10000,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    })

    if (!response.ok) throw new Error('Senha ou usuário inválido!')

    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
