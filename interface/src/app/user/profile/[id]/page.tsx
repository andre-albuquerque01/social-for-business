import { ShowOtherProfilePost } from '@/actions/user/otherProfile'
import { CardUserComponent } from '@/components/dashboard/cardUser'
import { CardPostsProfileComponent } from '@/components/user/profile/cardPostProfile'

interface PropsParams {
  params: {
    id: string
  }
  searchParams: {
    page: number
  }
}

export default async function Profile({ params, searchParams }: PropsParams) {
  let { page } = searchParams || 1
  if (page === undefined) page = 1

  const dt = await ShowOtherProfilePost(params.id, page)
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
