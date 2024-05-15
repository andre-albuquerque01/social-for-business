'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import VerificationPassword from '@/functions/verify-password'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function RecoverPassword(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const password = request.get('password') as string | null
  const passwordConfirmation = request.get('password_confirmation') as
    | string
    | null

  const cookieStore = cookies()
  const tk = cookieStore.get('tk')?.value
  request.set('token', String(tk))
  try {
    if (!password || !passwordConfirmation) {
      throw new Error('Preenchas os dados!')
    }

    if (passwordConfirmation !== password)
      throw new Error('Senhas não correspondem!')

    VerificationPassword(password)
    const response = await ApiAction('/user/recoverPassword', {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()
    console.log(data)

    if (data.data && data.data.message === 'Token invalid or expired') {
      throw new Error('Token inválido ou expirado, refaça a operação!')
    }

    if (!response.ok)
      throw new Error('Token inválido ou expirado, refaça a operação!')
  } catch (error) {
    return apiError(error)
  }
  cookieStore.delete('tk')
  redirect('/')
}
