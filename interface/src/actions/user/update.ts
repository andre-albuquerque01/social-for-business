'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/revalidateTag'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function UpdateUser(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const firstName = request.get('firstName') as string | null
  const lastName = request.get('lastName') as string | null
  const email = request.get('email') as string | null
  const password = request.get('password') as string | null
  const profileUrl = request.get('profileUrl') as File | null
  const coverPhotoUrl = request.get('coverPhotoUrl') as File | null
  if (profileUrl && profileUrl.size === 0) {
    request.set('profileUrl', '')
  }
  if (coverPhotoUrl && coverPhotoUrl.size === 0) {
    request.set('coverPhotoUrl', '')
  }

  try {
    if (!firstName || !lastName || !email || !password) {
      throw new Error('Preenchas os dados!')
    }
    const response = await ApiAction('/users/update', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: request,
    })

    RevalidateTag('post')
    RevalidateTag('user')

    const data = await response.json()

    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message)

    if (message.includes('The email has already been taken.'))
      throw new Error('E-mail já cadastrado!')

    if (message.includes('The image url one field must be an image.')) {
      throw new Error('Tipo de arquivo não é uma imagem.')
    }

    if (message.includes('The password field is required.'))
      throw new Error('Senha é requirida.')

    if (message.includes('Error updating')) throw new Error('Senha incorreta.')

    // return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
  redirect('/dashboard')
}
