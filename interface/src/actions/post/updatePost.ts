'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/revalidateTag'
import { cookies } from 'next/headers'

export async function UpdatePost(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const description = request.get('description') as string | null
  const idPost = request.get('idPost') as string | null
  try {
    if (!description || !idPost) throw new Error('Preencha a descrição.')

    const response = await ApiAction(`/post/update/${idPost}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: request,
    })

    RevalidateTag('post')

    const data = await response.json()

    if (
      data.message === 'The description field must be at least 10 characters.'
    )
      throw new Error('Descrição precisar ter no mínimo 10 caracteres.')

    if (
      data.message ===
      'The description field must not be greater than 255 characters.'
    )
      throw new Error('Descrição pode ter no máximo 255 caracteres.')

    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
