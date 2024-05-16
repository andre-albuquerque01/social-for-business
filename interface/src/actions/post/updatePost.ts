'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/revalidateTag'
import { cookies } from 'next/headers'

export async function UpdatePost(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const idPost = request.get('idPost') as string | null
  const description = request.get('description') as string | null
  try {
    if (!idPost || !description) throw new Error('Post invalido.')

    const response = await ApiAction(`/post/update/${idPost}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: request,
    })

    RevalidateTag('post')

    const data = await response.json()
    console.log(data)

    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
