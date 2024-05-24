'use server'

import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'

export interface UserInterface {
  idUser: string
  firstName: string
  lastName: string
  email: string
}

export async function ShowOneUser(idUser: string) {
  try {
    const response = await ApiAction(`/users/showOneUser/${idUser}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer' + cookies().get('token')?.value,
      },
      cache: 'no-cache',
    })
    const data = await response.json()

    return data
  } catch (err) {
    console.log(err)
  }
}
