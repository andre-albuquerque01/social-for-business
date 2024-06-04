'use client'
import { ShowUser, UserInterface } from '@/actions/user/show'
import { UpdateUser } from '@/actions/user/update'
import { ButtonComponent } from '@/components/form/button'
import { InputUpdateComponent } from '@/components/form/inputUpdate'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
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
          Editando...
        </button>
      ) : (
        <ButtonComponent title="Editar" />
      )}
    </>
  )
}

export default function UpdateUserPage() {
  const [state, action] = useFormState(UpdateUser, {
    ok: false,
    error: '',
    data: null,
  })
  const [data, setData] = useState<UserInterface>()

  useEffect(() => {
    const handleData = async () => {
      const data = await ShowUser()
      setData(data)
    }
    handleData()
  }, [])

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
    <div className="flex justify-center items-center h-screen">
      <Suspense>
        <form className="space-y-5 flex flex-col text-white" action={action}>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:text-zinc-600 w-20"
          >
            <GoArrowLeft className="w-5 h-5" />
            Voltar
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
              <div className="flex items-center gap-3">
                {profilePreview && (
                  <div className="flex flex-col">
                    <p className="py-2 text-white text-sm">Imagem adicionada</p>
                    <Image
                      src={profilePreview}
                      width={80}
                      height={80}
                      alt="Profile Preview"
                      className=""
                    />
                  </div>
                )}
                {data?.profileUrl && (
                  <div className="flex flex-col">
                    <p className="py-2 text-white text-sm">Imagem atual</p>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/user/${data?.profileUrl}`}
                      width={80}
                      height={80}
                      alt="Cover Preview"
                      className=""
                    />
                  </div>
                )}
              </div>
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
              <div className="flex items-center gap-3">
                {coverPreview && (
                  <div className="flex flex-col">
                    <p className="py-2 text-white text-sm">Imagem adicionada</p>
                    <Image
                      src={coverPreview}
                      width={100}
                      height={100}
                      alt="Cover Preview"
                      className=""
                    />
                  </div>
                )}
                {data?.coverPhotoUrl && (
                  <div className="flex flex-col">
                    <p className="py-2 text-white text-sm">Imagem atual</p>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/user/${data?.coverPhotoUrl}`}
                      width={100}
                      height={100}
                      alt="Cover Preview"
                      className=""
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
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
          {state?.error === 'E-mail já cadastrado!' && (
            <span className="text-sm text-red-600">E-mail já cadastrado!</span>
          )}
          <InputUpdateComponent
            type="password"
            label="Senha"
            name="password"
            id="Senha"
            required={true}
          />
          {state?.error === 'Senha é requirida.' && (
            <span className="text-sm text-red-600">Senha é requirida.</span>
          )}
          {state?.error === 'Senha incorreta.' && (
            <span className="text-sm text-red-600">Senha incorreta.</span>
          )}
          <FormButton />
        </form>
      </Suspense>
    </div>
  )
}
