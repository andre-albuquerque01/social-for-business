'use client'
import { VerifyToken } from '@/actions/user/verifyToken'
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
          Verificando...
        </button>
      ) : (
        <ButtonComponent title="Verificar" />
      )}
    </>
  )
}

export const TokenComponent = () => {
  const [state, action] = useFormState(VerifyToken, {
    ok: false,
    data: null,
    error: '',
  })
  return (
    <div className="text-white space-y-5">
      <Link
        href="/user/recover/sendEmail"
        className="flex items-center gap-2 w-20"
      >
        <GoArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <h1>Validar token</h1>
      <p className="w-96 max-md:w-80">
        Enviamos um email para o endereço fornecido com as instruções
        necessárias para recuperação de senha. Por favor, insira o token.
      </p>
      <form className="space-y-5 flex flex-col" action={action}>
        <InputComponent
          type="text"
          label="Token"
          name="token"
          id="token"
          required={true}
        />
        <span className="text-sm text-red-600">{state.error}</span>
        <FormButton />
      </form>
    </div>
  )
}
