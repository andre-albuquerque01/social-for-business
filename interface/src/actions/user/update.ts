'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import VerificationPassword from '@/functions/verify-password'
import { cookies } from 'next/headers'

export async function UpdateUser(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const firstName = request.get('firstName') as string | null
  const lastName = request.get('lastName') as string | null
  const email = request.get('email') as string | null
  const password = request.get('password') as string | null

  try {
    if (!firstName || !lastName || !email || !password) {
      throw new Error('Preenchas os dados!')
    }

    VerificationPassword(password)

    const response = await ApiAction('/users/update', {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer' + cookies().get('token')?.value,
      },
      body: request,
    })

    const data = await response.json()

    if (data.message === 'The email has already been taken.')
      throw new Error('E-mail já cadastrado!')

    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
