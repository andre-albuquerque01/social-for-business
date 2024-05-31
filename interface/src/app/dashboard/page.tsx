import { ShowPost } from '@/actions/post/show'
import { CardPostsComponent } from '@/components/dashboard/cardPost'
import { CardUserComponent } from '@/components/dashboard/cardUser'
import { CreatePost } from '@/components/post/createPost'

export const runtime = 'edge'

interface SearchParamsProps {
  searchParams: {
    page: number
  }
}

export default async function Dashboard({ searchParams }: SearchParamsProps) {
  let { page } = searchParams || 1
  if (page === undefined) page = 1

  const dt = await ShowPost(page)

  if (!dt) {
    return (
      <div className="min-h-screen text-white flex gap-4 p-4 max-md:flex-col ">
        <div className="md:w-[25%] max-md:max-w-full">
          <CardUserComponent />
        </div>
        <div className="space-y-4 md:w-[75%] max-md:max-w-full">
          <CreatePost />
          <p>Erro ao carregar os posts. Tente novamente mais tarde.</p>
        </div>
      </div>
    )
  }

  const data = dt.data
  const count = dt.countPage

  return (
    <div className="min-h-screen text-white flex gap-4 p-4 max-md:flex-col ">
      <div className="md:w-[25%] max-md:max-w-full">
        <CardUserComponent />
      </div>
      <div className="space-y-4 md:w-[75%] max-md:max-w-full">
        <CreatePost />
        {dt && (
          <CardPostsComponent data={data} query={page} countPage={count} />
        )}
      </div>
    </div>
  )
}
