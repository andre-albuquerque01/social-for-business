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

    const response = await ApiAction('/comment', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + cookies().get('token')?.value,
        Accept: 'application/json',
      },
      body: request,
    })
    const data = await response.json()
    console.log(data)

    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message)

    if (
      message &&
      message.includes(
        'The comment field must not be greater than 255 characters.',
      )
    )
      throw new Error(
        'Ultrapassou o máximo de caracteres, permitido o máximo de 255.',
      )

    if (message && message.includes('The comment field format is invalid.'))
      throw new Error('Não pode inserir html.')

    if (
      message &&
      message.includes('The comment field must be at least 3 characters.')
    )
      throw new Error('Minimo 3 caracteres.')

    RevalidateTag('post')

    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
