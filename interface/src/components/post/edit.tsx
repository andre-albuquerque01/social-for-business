'use client'
import { FormEvent, Suspense, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Post } from '../dashboard/cardPost'
import { UpdatePost } from '@/actions/post/updatePost'
import Image from 'next/image'
import { GoArrowLeft } from 'react-icons/go'
import { useRouter } from 'next/navigation'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-32 rounded-lg"
          disabled={pending}
        >
          Alterando...
        </button>
      ) : (
        <button className="bg-blue-600 text-white px-4 py-2 w-32 rounded-lg">
          Alterar
        </button>
      )}
    </>
  )
}

export async function EditPostComponent({ data }: { data: Post }) {
  const [img, setImg] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const req = await UpdatePost(formData)
    if (req === 'success') {
      alert('Alterado com sucesso!')
    }
  }

  function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files && target.files.length > 0)
      setImg(URL.createObjectURL(target.files[0]))
  }

  return (
    <Suspense>
      <div className="my-auto rounded-lg p-4 flex flex-col justify-center">
        <div
          onClick={(e) => {
            e.preventDefault()
            router.back()
          }}
          className="flex items-center py-4 text-white"
        >
          <GoArrowLeft className="w-5 h-5" />
          Voltar
        </div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="idPost" defaultValue={data.idPost} />
          <textarea
            name="description"
            id="(description)"
            className="w-[100%] bg-zinc-600 p-3 outline-none rounded-lg text-white"
            placeholder="Começar publicação..."
            rows={5}
            defaultValue={data.description}
          ></textarea>
          <div className="flex justify-between items-center">
            <input
              type="file"
              name="imageUrlOne"
              id="imageUrlOne"
              className="text-sm text-stone-500
            file:mr-5 file:py-1 file:px-3 file:border-[1px]
            file:text-xs file:font-medium
            file:bg-stone-50 file:text-stone-700
            hover:file:cursor-pointer hover:file:bg-blue-50
            hover:file:text-blue-700"
              onChange={handleImgChange}
            />
            <FormButton />
          </div>
        </form>
        {img && (
          <Image src={img} alt="Imagem do post" width={100} height={100} />
        )}
      </div>
    </Suspense>
  )
}
