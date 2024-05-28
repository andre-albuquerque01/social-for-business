'use client'
import { ShowOnePost } from '@/actions/post/showOnePost'
import { UpdatePost } from '@/actions/post/updatePost'
import { Post } from '@/components/dashboard/cardPost'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { GoArrowLeft } from 'react-icons/go'

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

export default function EditPost({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Post>()

  const [state, action] = useFormState(UpdatePost, {
    ok: false,
    error: '',
    data: null,
  })

  useEffect(() => {
    if (state.ok) {
      alert('Alterado com sucesso!')
    }
  }, [state])

  useEffect(() => {
    const handleData = async () => {
      const data = (await ShowOnePost(params.id)) as Post
      setData(data)
    }
    handleData()
  }, [])

  const [img, setImg] = useState('')
  const router = useRouter()

  function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files && target.files.length > 0)
      setImg(URL.createObjectURL(target.files[0]))
  }

  return (
    <Suspense>
      {/* <EditPostComponent post={data} /> */}
      <div className="my-auto rounded-lg p-4 flex flex-col justify-center">
        <div
          onClick={(e) => {
            e.preventDefault()
            router.back()
          }}
          className="flex items-center py-4 text-white cursor-pointer"
        >
          <GoArrowLeft className="w-5 h-5" />
          Voltar
        </div>
        <form action={action}>
          <input type="hidden" name="idPost" defaultValue={data?.idPost} />
          <textarea
            name="description"
            id="description"
            className="w-[100%] bg-zinc-600 p-3 outline-none rounded-lg text-white"
            placeholder="Começar publicação..."
            rows={5}
            defaultValue={data?.description}
            required
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
        <p className="text-xs text-red-600 py-3">{state.error}</p>
        {img && (
          <>
            <p className="py-2 text-white">Imagem adicionada</p>
            <Image src={img} alt="Imagem do post" width={100} height={100} />
          </>
        )}
        {data?.imageUrlOne && (
          <>
            <p className="py-2 text-white">Imagem atual</p>
            <Image
              src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/post/${data.imageUrlOne}`}
              alt="Image post"
              width={100}
              height={100}
              className="w-52 h-auto"
            />
          </>
        )}
      </div>
    </Suspense>
  )
}
