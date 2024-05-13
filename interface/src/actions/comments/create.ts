'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/revalidateTag'
import { cookies } from 'next/headers'

export async function CreateCommentAction(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const comment = request.get('comment') as string | null

  try {
    if (!comment) throw new Error('Preencha o comentário.')

    await ApiAction('/comment', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: request,
    })

    RevalidateTag('post')

    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
