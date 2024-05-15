'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { redirect } from 'next/navigation'

export async function SendEmailVerify(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const email = request.get('email') as string | null

  try {
    if (!email) throw new Error('Preenchas os dados!')

    const response = await ApiAction('/user/reSendEmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()
    console.log(data)

    if (data.data && data.data.message === 'User not found') {
      throw new Error('E-mail não existe!')
    }

    if (!response.ok) throw new Error('E-mail inválido!')
  } catch (error) {
    return apiError(error)
  }

  redirect('/')
}
