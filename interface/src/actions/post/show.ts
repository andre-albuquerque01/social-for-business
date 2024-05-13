'use server'

import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'

export interface PostInterface {
  data: {
    idPost: string
    imageUrlOne: string
    description: string
    created_at: string
    idUser: string
    firstName: string
    lastName: string
    comments: {
      idComment: string
      post_idPost: string
      comment: string
      created_at: string
    }
    rate: { idRate: string }
  }
}

export async function ShowPost() {
  try {
    const response = await ApiAction('/post', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer' + cookies().get('token')?.value,
      },
      next: {
        revalidate: 60 * 30,
        tags: ['post'],
      },
      // cache: 'no-cache',
    })
    const data = await response.json()

    return data.data
  } catch (err) {
    console.log(err)
  }
}
