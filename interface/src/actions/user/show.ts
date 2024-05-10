'use server'

import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'

interface UserInterface {
  data: {
    idUser: string
    firstName: string
    lastName: string
  }
}

export async function ShowUser() {
  try {
    const response = await ApiAction('/users/show', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + cookies().get('token')?.value,
      },
      next: {
        revalidate: 60 * 30,
      },
    })
    const data = (await response.json()) as UserInterface

    return data.data
  } catch (err) {
    console.log(err)
  }
}
