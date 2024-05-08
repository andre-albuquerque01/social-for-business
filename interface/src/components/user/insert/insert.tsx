'use client'
import { InsertUser } from '@/actions/user/insert'
import { ButtonComponent } from '@/components/form/button'
import { InputComponent } from '@/components/form/input'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="bg-red-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Enviando...
        </button>
      ) : (
        <ButtonComponent title="Cadastar" />
      )}
    </>
  )
}

export const InsertUserComponent = () => {
  const [state, action] = useFormState(InsertUser, {
    ok: false,
    error: '',
    data: null,
  })

  return (
    <form className="space-y-5 flex flex-col text-white" action={action}>
      <Link href="/">{'<- Voltar'}</Link>
      <InputComponent
        type="text"
        label="Nome"
        name="firstName"
        id="firstName"
        required={true}
      />
      <InputComponent
        type="text"
        label="Sobrenome"
        name="lastName"
        id="lastName"
        required={true}
      />
      <InputComponent
        type="email"
        label="E-mail"
        name="email"
        id="email"
        required={true}
      />
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
      <div className="text-white flex items-center gap-2">
        <input type="checkbox" name="term_aceite" id="term_aceite" />{' '}
        <label htmlFor="term_aceite">
          Ler{' '}
          <Link href="" className="text-blue-600">
            termos de aceites
          </Link>
          <span className="text-xs text-red-600"> *</span>
        </label>
      </div>
      <p className="text-xs text-red-600">{state.error}</p>
      <FormButton />
    </form>
  )
}
