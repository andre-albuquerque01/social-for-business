import { CardPostsComponent } from '@/components/dashboard/cardPost'
import { CardUserComponent } from '@/components/dashboard/cardUser'
import { CreatePost } from '@/components/dashboard/createPost'

export default function Dashboard() {
  return (
    <div className="min-h-screen text-white flex gap-4 p-4">
      <CardUserComponent />
      <div className="flex-1 space-y-4">
        <CreatePost />
        <CardPostsComponent />
        <CardPostsComponent />
        <CardPostsComponent />
        <CardPostsComponent />
      </div>
    </div>
  )
}
