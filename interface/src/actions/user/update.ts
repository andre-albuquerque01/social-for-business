'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/revalidateTag'
import { cookies } from 'next/headers'

export async function UpdateUser(request: object) {
  try {
    const response = await ApiAction('/users/update', {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer' + cookies().get('token')?.value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    RevalidateTag('post')
    RevalidateTag('user')

    const data = await response.json()
    console.log(data)

    if (data.message === 'The email has already been taken.')
      return 'E-mail já cadastrado!'

    if (data.message === 'The password field is required.')
      return 'Senha é requirida.'

    if (data.message === 'Error updating') return 'Senha incorreta .'

    return ''
  } catch (error) {
    return 'Error'
  }
}
