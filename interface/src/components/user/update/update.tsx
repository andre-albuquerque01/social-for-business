'use client'
import { UserInterface } from '@/actions/user/show'
import { UpdateUser } from '@/actions/user/update'
import { ButtonComponent } from '@/components/form/button'
import { InputUpdateComponent } from '@/components/form/inputUpdate'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useFormStatus } from 'react-dom'
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
          Editando...
        </button>
      ) : (
        <ButtonComponent title="Editar" />
      )}
    </>
  )
}

export default function UpdateUserComponent({ data }: { data: UserInterface }) {
  const [error, setError] = useState('')
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await UpdateUser(data)
    setError(req)
    if (req === '') {
      window.location.href = '/dashboard'
    }
  }

  return (
    <form
      className="space-y-5 flex flex-col text-white"
      onSubmit={handleSubmit}
    >
      <Link
        href="/dashboard"
        className="flex items-center gap-2 hover:text-zinc-600 w-20"
      >
        <GoArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <InputUpdateComponent
        type="text"
        label="Nome"
        name="firstName"
        id="firstName"
        required={true}
        value={data?.firstName}
      />
      <InputUpdateComponent
        type="text"
        label="Sobrenome"
        name="lastName"
        id="lastName"
        required={true}
        value={data?.lastName}
      />
      <InputUpdateComponent
        type="email"
        label="E-mail"
        name="email"
        id="email"
        required={true}
        value={data?.email}
      />
      <InputUpdateComponent
        type="password"
        label="Senha"
        name="password"
        id="Senha"
        required={true}
      />
      <p className="text-xs text-red-600">{error && error}</p>
      <FormButton />
    </form>
  )
}
