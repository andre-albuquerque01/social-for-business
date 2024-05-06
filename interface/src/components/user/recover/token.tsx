import { ButtonComponent } from '@/components/form/button'
import { InputComponent } from '@/components/form/input'
import Link from 'next/link'

export const TokenComponent = () => {
  return (
    <div className="text-white space-y-5">
      <Link href="/">{'<- Voltar'}</Link>
      <h1>Recuperar senha</h1>
      <p className="w-96 max-md:w-80">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur id
        deleniti porro eos obcaecati, quam ratione provident dolore. Praesentium
        inventore fugit rerum. Numquam asperiores quis, itaque magnam ipsam
        dolorem tenetur!
      </p>
      <form className="space-y-5 flex flex-col ">
        <InputComponent
          type="text"
          label="Token"
          name="token"
          id="token"
          required={true}
        />

        <ButtonComponent title="Enviar" />
      </form>
    </div>
  )
}
