'use server'

import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'

export interface UserInterface {
  idUser: string
  firstName: string
  lastName: string
  profileUrl: string
  coverPhotoUrl: string
  email: string
}

export async function ShowUser() {
  try {
    const response = await ApiAction('/users/show', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer' + cookies().get('token')?.value,
      },
      next: {
        revalidate: 60 * 30,
        tags: ['user'],
      },
    })
    const data = await response.json()

    return data.data
  } catch (err) {
    console.log(err)
  }
}
