'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function VerifyToken(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const token = request.get('token') as string | null

  const cookieStore = cookies()

  try {
    if (!token) throw new Error('Preenchas os dados!')

    const response = await ApiAction('/user/verifyToken', {
      method: 'POST',
      body: request,
    })

    const data = await response.json()

    cookieStore.set('tk', token, {
      expires: Date.now() + 60 * 10 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    })

    if (data.data && data.data.message === 'Token invalid or expired') {
      throw new Error('Token inválido ou expirado!')
    }

    if (!response.ok) throw new Error('Token inválido ou expirado!')
  } catch (error) {
    return apiError(error)
  }

  redirect('/user/recover/password')
}
