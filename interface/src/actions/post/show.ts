'use server'

import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'

export interface PostInterface {
  idPost: string
  imageUrlOne: string
  description: string
  created_at: string
  idUser: string
  firstName: string
  lastName: string
  comments: {
    idUser: string
    idComment: string
    post_idPost: string
    comment: string
    created_at: string
  }
  rate: { idRate: string }
}

export async function ShowPost(page: number) {
  try {
    const response = await ApiAction(`/post?page=${page}`, {
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
    // const data = await response.json()
    const datas = await response.json()
    const countPage = datas.meta.last_page
    const data = datas.data

    return { data, countPage }
  } catch (err) {
    console.log(err)
  }
}
