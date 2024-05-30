'use client'
import { CreatePostAction } from '@/actions/post/create'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { GoX } from 'react-icons/go'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-32 rounded-lg"
          disabled={pending}
        >
          Postando...
        </button>
      ) : (
        <button className="bg-blue-600 text-white px-4 py-2 w-32 rounded-lg">
          Postar
        </button>
      )}
    </>
  )
}
export const CreatePost = () => {
  const [state, action] = useFormState(CreatePostAction, {
    ok: false,
    error: '',
    data: null,
  })

  const [img, setImg] = useState('')
  const [description, setDescription] = useState('')

  function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files && target.files.length > 0)
      setImg(URL.createObjectURL(target.files[0]))
  }

  useEffect(() => {
    if (state.ok) {
      setImg('')
      setDescription('')
    }
  }, [state])

  function handleDescriptionChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setDescription(event.target.value)
  }

  return (
    <div className="bg-zinc-800 h-auto p-4 rounded-lg">
      <form action={action}>
        <textarea
          name="description"
          id="(description)"
          className="w-[100%] bg-zinc-600 p-3 outline-none rounded-lg"
          placeholder="Começar publicação..."
          rows={5}
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="file"
              name="imageUrlOne"
              id="imageUrlOne"
              className="text-sm text-stone-500 max-sm:w-40
            file:py-1 file:px-3 file:border-[1px]
            file:text-xs file:font-medium
            file:bg-stone-50 file:text-stone-700
            hover:file:cursor-pointer hover:file:bg-blue-50
            hover:file:text-blue-700"
              onChange={handleImgChange}
            />
            {img && (
              <GoX
                className="h-5 w-5 cursor-pointer"
                onClick={() => setImg('')}
              />
            )}
          </div>
          <FormButton />
        </div>
      </form>
      {img && <Image src={img} alt="Imagem do post" width={100} height={100} />}
      <p className="text-red-600 text-sm">{state.error}</p>
    </div>
  )
}
