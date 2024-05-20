'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/revalidateTag'
import { cookies } from 'next/headers'

export async function UpdatePost(request: object, idPost: string) {
  console.log(request)

  try {
    const response = await ApiAction(`/post/update/${idPost}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    RevalidateTag('post')

    const data = await response.json()
    console.log(data)

    return 'success'
  } catch (error) {
    return apiError(error)
  }
}
