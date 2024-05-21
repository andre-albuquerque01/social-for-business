'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/revalidateTag'
import { cookies } from 'next/headers'

export async function UpdatePost(request: FormData, idPost: string) {
  console.log(request)

  try {
    await ApiAction(`/post/update/${idPost}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: request,
    })

    RevalidateTag('post')

    return 'success'
  } catch (error) {
    return apiError(error)
  }
}
