'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/revalidateTag'
import { cookies } from 'next/headers'

export async function DeletePostAction(idPost: string) {
  try {
    await ApiAction(`/post/delete/${idPost}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
    })
  } catch (error) {
    console.log(error)
  }

  RevalidateTag('post')
}
