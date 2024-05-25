'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/revalidateTag'
import { cookies } from 'next/headers'

export async function DeleteCommentAction(idComment: string) {
  try {
    await ApiAction(`/comment/delete/${idComment}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
    })
  } catch (error) {
    console.log(error)
  }
  RevalidateTag('userPost')
  RevalidateTag('post')
}
