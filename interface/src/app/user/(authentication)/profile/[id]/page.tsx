import { ShowOtherProfilePost } from '@/actions/user/otherProfile'
import { ShowOneUser } from '@/actions/user/showOneUser'
import { CardOneUserComponent } from '@/components/user/profile/cardOneUser'
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

  const user = await ShowOneUser(params.id)
  const userData = user?.data

  return (
    <div className="min-h-screen text-white flex gap-4 p-4 max-md:flex-col ">
      <div className="md:w-[25%] md:max-w-full">
        <CardOneUserComponent
          firstName={userData.firstName}
          lastName={userData.lastName}
          profileUrl={userData.profileUrl}
          coverPhotoUrl={userData.coverPhotoUrl}
        />
      </div>
      <div className="space-y-4 md:w-[75%] md:max-w-full">
        <CardPostsProfileComponent data={data} query={page} countPage={count} />
      </div>
    </div>
  )
}
