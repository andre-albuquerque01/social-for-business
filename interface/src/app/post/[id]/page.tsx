import { ShowOnePost } from '@/actions/post/showOnePost'
import { EditPostComponent } from '@/components/post/edit'

export default async function EditPost({ params }: { params: { id: string } }) {
  const data = await ShowOnePost(params.id)
  return (
    <div className="">
      <EditPostComponent post={data} />
    </div>
  )
}
