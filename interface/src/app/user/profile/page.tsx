import { ShowProfilePost } from '@/actions/user/profilePost'
import { CardUserComponent } from '@/components/dashboard/cardUser'
import { CardPostsProfileComponent } from '@/components/user/profile/cardPostProfile'

interface SearchParamsProps {
  searchParams: {
    page: number
  }
}

export default async function Profile({ searchParams }: SearchParamsProps) {
  let { page } = searchParams || 1
  if (page === undefined) page = 1

  const dt = await ShowProfilePost(page)
  const data = dt?.data
  const count = dt?.countPage

  return (
    <div className="min-h-screen text-white flex gap-4 p-4 max-md:flex-col ">
      <div className="md:w-[25%] md:max-w-full">
        <CardUserComponent />
      </div>
      <div className="space-y-4 md:w-[75%] md:max-w-full">
        <CardPostsProfileComponent data={data} query={page} countPage={count} />
      </div>
    </div>
  )
}
