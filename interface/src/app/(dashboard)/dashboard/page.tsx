import { ShowPost } from '@/actions/post/show'
import { CardPostsComponent } from '@/components/dashboard/cardPost'
import { CardUserComponent } from '@/components/dashboard/cardUser'
import { CreatePost } from '@/components/dashboard/createPost'

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
  const data = dt?.data
  const count = dt?.countPage

  return (
    <div className="min-h-screen text-white flex gap-4 p-4 max-md:flex-col ">
      <div className="md:w-[25%] md:max-w-full">
        <CardUserComponent />
      </div>
      <div className="space-y-4 md:w-[75%] md:max-w-full">
        <CreatePost />
        <CardPostsComponent data={data} query={page} countPage={count} />
      </div>
    </div>
  )
}
