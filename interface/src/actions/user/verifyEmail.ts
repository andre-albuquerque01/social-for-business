'use server'

import ApiAction from '@/functions/data/apiAction'

export async function VerifyEmail(email: string) {
  try {
    const response = await ApiAction(`/user/${email}`, {
      headers: {
        Accept: 'application/json',
      },
    })

    const data = await response.json()

    if (data.data && data.data.message === 'E-mail verificado')
      return 'E-mail verificado!'
    else return 'E-mail não verificado!'
  } catch (err) {
    return ''
  }
}
