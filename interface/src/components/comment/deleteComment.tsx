import { DeleteCommentAction } from '@/actions/comments/delete'

export const DeleteCommentComponent = ({
  idComment,
}: {
  idComment: string
}) => {
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (confirm('Tem certeza de quer excluir?'))
      await DeleteCommentAction(idComment)
  }
  return (
    <>
      <li className="py-2 px-4 hover:bg-zinc-800 cursor-pointer rounded">
        <button onClick={handleDelete}>Remove</button>
      </li>
    </>
  )
}
