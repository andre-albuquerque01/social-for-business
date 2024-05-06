import { ButtonComponent } from '@/components/form/button'
import { InputComponent } from '@/components/form/input'
import Link from 'next/link'

export const UpdatePasswordComponent = () => {
  return (
    <div className="text-white space-y-5">
      <Link href="/">{'<- Voltar'}</Link>
      <h1>Alterar senha</h1>
      <form className="space-y-5 flex flex-col">
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
        <ButtonComponent title="Alterar" />
      </form>
    </div>
  )
}
