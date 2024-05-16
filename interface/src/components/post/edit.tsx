'use client'
import { Suspense, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Post } from '../dashboard/cardPost'
import { UpdatePost } from '@/actions/post/updatePost'
import Image from 'next/image'

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

export async function EditPostComponent({ post }: { post: Post }) {
  const [img, setImg] = useState('')

  const [state, action] = useFormState(UpdatePost, {
    ok: false,
    error: '',
    data: null,
  })

  function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files && target.files.length > 0)
      setImg(URL.createObjectURL(target.files[0]))
  }

  return (
    <div className="h-auto  rounded-lg">
      <Suspense>
        <form action={action}>
          <input type="hidden" name="idPost" defaultValue={post.idPost} />
          <textarea
            name="description"
            id="(description)"
            className="w-[100%] bg-zinc-600 p-3 outline-none rounded-lg text-white"
            placeholder="Começar publicação..."
            rows={5}
            defaultValue={post.description}
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
        {/* {img && ( */}
        {post.imageUrlOne ||
          (img && (
            <Image
              src={img}
              alt="Imagem do post"
              defaultValue={post.imageUrlOne}
              width={100}
              height={100}
            />
          ))}
        <p className="text-red-600 text-sm">{state.error}</p>
      </Suspense>
    </div>
  )
}
