import { CardPostsComponent } from '@/components/dashboard/cardPost'
import { CardUserComponent } from '@/components/dashboard/cardUser'
import { CreatePost } from '@/components/dashboard/createPost'

export const runtime = 'edge'

export default async function Dashboard() {
  return (
    <div className="min-h-screen text-white flex gap-4 p-4 max-md:flex-col">
      <CardUserComponent />
      <div className="flex-1 space-y-4">
        <CreatePost />
        <CardPostsComponent />
      </div>
    </div>
  )
}
