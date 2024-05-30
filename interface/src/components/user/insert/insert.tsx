'use client'
import { InsertUser } from '@/actions/user/insert'
import { ButtonComponent } from '@/components/form/button'
import { InputComponent } from '@/components/form/input'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { useState } from 'react'
import Image from 'next/image'
import { GoArrowLeft, GoX } from 'react-icons/go'

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

  const [profilePreview, setProfilePreview] = useState('')
  const [coverPreview, setCoverPreview] = useState('')

  function handleProfileChange({
    target,
  }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files && target.files.length > 0)
      setProfilePreview(URL.createObjectURL(target.files[0]))
  }

  function handleCoverChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files && target.files.length > 0)
      setCoverPreview(URL.createObjectURL(target.files[0]))
  }

  return (
    <form className="space-y-5 flex flex-col text-white" action={action}>
      <Link href="/" className="flex items-center">
        <GoArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <div className="mx-auto md:w-96 max-md:w-80 space-y-5">
        <div>
          <label htmlFor="profileUrl">Imagem de perfil:</label>
          <div className="flex items-center justify-between">
            <input
              type="file"
              name="profileUrl"
              id="profileUrl"
              className="text-sm text-stone-500
          file:mr-5 file:py-1 file:px-3 file:border-[1px]
          file:text-xs file:font-medium
          file:bg-stone-50 file:text-stone-700
          hover:file:cursor-pointer hover:file:bg-blue-50
          hover:file:text-blue-700"
              onChange={handleProfileChange}
            />
            {profilePreview && (
              <GoX
                className="h-5 w-5 cursor-pointer"
                onClick={() => setProfilePreview('')}
              />
            )}
          </div>
          {profilePreview && (
            <Image
              src={profilePreview}
              width={100}
              height={100}
              alt="Profile Preview"
              className="preview"
            />
          )}
        </div>
        <div>
          <label htmlFor="coverPhotoUrl">Imagem de capa</label>
          <div>
            <input
              type="file"
              name="coverPhotoUrl"
              id="coverPhotoUrl"
              className="text-sm text-stone-500
            file:mr-5 file:py-1 file:px-3 file:border-[1px]
          file:text-xs file:font-medium
          file:bg-stone-50 file:text-stone-700
          hover:file:cursor-pointer hover:file:bg-blue-50
          hover:file:text-blue-700"
              onChange={handleCoverChange}
            />
          </div>
          {coverPreview && (
            <Image
              src={coverPreview}
              width={100}
              height={100}
              alt="Cover Preview"
              className="preview"
            />
          )}
        </div>
      </div>
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
          <Link href="/term" className="text-blue-600">
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
