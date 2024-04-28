import { ButtonComponent } from '@/components/form/button'
import { InputComponent } from '@/components/form/input'
import Link from 'next/link'

export const InsertUserComponent = () => {
  return (
    <form className="space-y-5 flex flex-col text-white">
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
        </label>
      </div>
      <ButtonComponent title="Cadastar" />
    </form>
  )
}
