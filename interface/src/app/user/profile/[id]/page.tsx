import { CardUserComponent } from '@/components/dashboard/cardUser'
import { OtherProfilePostComponent } from '@/components/user/otherProfile/otherProfile'

export default function Profile({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen text-white flex gap-4 p-4 max-md:flex-col ">
      <div className="md:w-[25%] md:max-w-full">
        <CardUserComponent />
      </div>
      <div className="space-y-4 md:w-[75%] md:max-w-full">
        <OtherProfilePostComponent idUser={params.id} />
      </div>
    </div>
  )
}
