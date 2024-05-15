'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { redirect } from 'next/navigation'

export async function SendEmail(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const email = request.get('email') as string | null

  try {
    if (!email) throw new Error('Preenchas os dados!')

    const response = await ApiAction('/user/recoverEmail', {
      method: 'POST',
      body: request,
    })

    const data = await response.json()

    if (data.data && data.data.message === 'User not found') {
      throw new Error('E-mail inválido!')
    }

    if (!response.ok) throw new Error('E-mail inválido!')
  } catch (error) {
    return apiError(error)
  }

  redirect('/user/recover/token')
}
