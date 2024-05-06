import Link from 'next/link'
import { ButtonComponent } from '../form/button'
import { InputComponent } from '../form/input'

export const LoginComponent = () => {
  return (
    <div className="flex flex-col ">
      {/* <h1>Login</h1> */}
      <form className="space-y-5 flex flex-col">
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
        <p className="text-white text-xs">
          Esqueceu a senha?{' '}
          <Link href="" className="text-blue-500 text-xs">
            Recuperar
          </Link>
        </p>
        <ButtonComponent title="Entrar" />
      </form>
      <div className="mt-6 w-96 max-sm:w-80 text-center max-md:mx-auto space-y-5">
        <hr />
        <p className="text-white text-xs">
          Não tem uma conta?{' '}
          <Link href="" className="text-blue-500 text-xs">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
