'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'

export async function ShowProfilePost() {
  try {
    const response = await ApiAction('/post/user', {
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
    return apiError(err)
  }
}
