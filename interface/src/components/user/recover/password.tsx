'use client'
import { RecoverPassword } from '@/actions/user/recoverPassword'
import { ButtonComponent } from '@/components/form/button'
import { InputComponent } from '@/components/form/input'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { GoArrowLeft } from 'react-icons/go'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="bg-red-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Alterando...
        </button>
      ) : (
        <ButtonComponent title="Alterar" />
      )}
    </>
  )
}

export const UpdatePasswordComponent = () => {
  const [state, action] = useFormState(RecoverPassword, {
    ok: false,
    data: null,
    error: '',
  })

  return (
    <div className="text-white space-y-5">
      <Link href="/user/recover/token" className="flex items-center gap-2 w-20">
        <GoArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <h1>Alterar senha</h1>
      <form className="space-y-5 flex flex-col" action={action}>
        <InputComponent
          type="password"
          label="Senha"
          name="password"
          id="Senha"
          required={true}
        />
        <InputComponent
          type="password"
          label="Confirmação de senha"
          name="password_confirmation"
          id="Confirmação de senha"
          required={true}
        />
        <span className="text-sm text-red-600">{state.error}</span>
        <FormButton />
      </form>
    </div>
  )
}
