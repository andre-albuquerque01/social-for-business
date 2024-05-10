import { UpdateUser } from '@/actions/user/update'
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
          Editando...
        </button>
      ) : (
        <ButtonComponent title="Editar" />
      )}
    </>
  )
}

export default function UpdateUserComponent() {
  const [state, action] = useFormState(UpdateUser, {
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
      <p className="text-xs text-red-600">{state.error}</p>
      <FormButton />
    </form>
  )
}
