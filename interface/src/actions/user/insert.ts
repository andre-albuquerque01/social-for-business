'use server'

import apiError from '@/functions/api-error'
import ApiAction from '@/functions/data/apiAction'
import VerificationPassword from '@/functions/verify-password'

export async function InsertUser(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const firstName = request.get('firstName') as string | null
  const lastName = request.get('lastName') as string | null
  const email = request.get('email') as string | null
  const password = request.get('password') as string | null
  const passwordConfirmation = request.get('password_confirmation') as
    | string
    | null
  const termAceite = request.get('term_aceite') === 'on' ? 1 : 0
  request.set('term_aceite', String(termAceite))

  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordConfirmation ||
      !termAceite
    ) {
      throw new Error('Preenchas os dados!')
    }
    if (password !== passwordConfirmation) {
      throw new Error('Senha incompativel!')
    }

    VerificationPassword(password)

    const response = await ApiAction('/user/store', {
      method: 'POST',
      headers: {
        accept: 'application/json',
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
