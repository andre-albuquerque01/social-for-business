'use server'

import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'

export async function ShowOtherProfilePost(idUser: string, page: number) {
  try {
    const response = await ApiAction(`/post/showUser/${idUser}?page=${page}`, {
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

    const datas = await response.json()
    const countPage = datas.meta.last_page
    const data = datas.data

    return { data, countPage }
  } catch (err) {
    console.log(err)
  }
}
