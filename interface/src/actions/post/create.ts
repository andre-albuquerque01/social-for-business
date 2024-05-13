'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/revalidateTag'
import { cookies } from 'next/headers'

export async function CreatePostAction(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const description = request.get('description') as string | null
  const imageUrlOne = request.get('imageUrlOne') as File | null

  try {
    if (!description) throw new Error('Preencha a descrição.')
    if (imageUrlOne && imageUrlOne.size === 0) {
      request.set('imageUrlOne', '')
    }

    const response = await ApiAction('/post', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: request,
    })

    const data = await response.json()

    RevalidateTag('post')

    if (
      data.message === 'The description field must be at least 10 characters.'
    )
      throw new Error('Descrição precisar ter no mínimo 10 caracteres.')

    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
