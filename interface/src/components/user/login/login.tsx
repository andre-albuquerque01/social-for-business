'use client'
import Link from 'next/link'
import { InputComponent } from '../../form/input'
import { useFormState, useFormStatus } from 'react-dom'
import { Login } from '@/actions/user/login'
import { useRouter } from 'next/navigation'

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
        <button className="bg-red-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg">
          Entrar
        </button>
      )}
    </>
  )
}

export const LoginComponent = () => {
  const router = useRouter()
  const [state, action] = useFormState(Login, {
    ok: false,
    error: '',
    data: null,
  })

  if (state.ok) router.push('/dashboard')

  return (
    <div className="flex flex-col ">
      {/* <h1>Login</h1> */}
      <form action={action} className="space-y-5 flex flex-col">
        <InputComponent
          type="email"
          label="E-mail"
          name="email"
          id="email"
          required={false}
        />
        <InputComponent
          type="password"
          label="Senha"
          name="password"
          id="Senha"
          required={false}
        />
        <span className="text-xs text-red-600">{state.error}</span>
        <p className="text-white text-xs">
          Esqueceu a senha?{' '}
          <Link
            href="/user/recover/sendEmail"
            className="text-blue-500 text-xs"
          >
            Recuperar
          </Link>
        </p>
        <FormButton />
      </form>
      <div className="mt-6 w-96 max-sm:w-80 text-center max-md:mx-auto space-y-5">
        <hr />
        <p className="text-white text-xs">
          Não tem uma conta?{' '}
          <Link href="/user/insert" className="text-blue-500 text-xs">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
