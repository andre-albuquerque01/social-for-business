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
    })

    const datas = await response.json()

    if (!datas.meta || typeof datas.meta.last_page === 'undefined') {
      throw new Error('Estrutura de dados inesperada.')
    }

    const countPage = datas.meta.last_page
    const data = datas.data

    return { data, countPage }
  } catch (err) {
    console.log(err)
    return null
  }
}
