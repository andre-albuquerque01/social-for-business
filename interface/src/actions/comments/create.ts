'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'

export async function CreateCommentAction(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const description = request.get('description') as string | null

  try {
    if (!description) throw new Error('Preencha a descrição.')

    await ApiAction('/comment', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: request,
    })

    // const data = await response.json()

    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
