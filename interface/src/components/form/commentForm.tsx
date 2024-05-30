'use client'
import { CreateCommentAction } from '@/actions/comments/create'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

function FormBtn() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          disabled={pending}
          className="bg-blue-600 text-white px-4 py-2 w-32 rounded-lg"
        >
          Comentando...
        </button>
      ) : (
        <button className="bg-blue-600 text-white px-4 py-2 w-32 rounded-lg">
          Comentar
        </button>
      )}
    </>
  )
}

export function CommentForm({ idPost }: { idPost: string }) {
  const [state, action] = useFormState(CreateCommentAction, {
    ok: false,
    error: '',
    data: null,
  })

  const [comment, setComment] = useState('')

  useEffect(() => {
    if (state.ok) {
      setComment('')
    }
  }, [state])
  function handleCommentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value)
  }

  return (
    <>
      <form action={action}>
        <input type="hidden" name="post_idPost" value={idPost} />
        <textarea
          name="comment"
          id="comment"
          className="w-[100%] bg-zinc-600 p-3 outline-none rounded-lg"
          placeholder="Começar comentar..."
          rows={3}
          required
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <FormBtn />
        <span className="text-md text-red-600 ml-5">{state.error}</span>
      </form>
    </>
  )
}
