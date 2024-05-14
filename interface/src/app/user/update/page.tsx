import { ShowUser, UserInterface } from '@/actions/user/show'
import UpdateUserComponent from '@/components/user/update/update'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Alterar usuário',
  },
}

export default async function UpdateUser() {
  const data: UserInterface = await ShowUser()

  return (
    <div className="flex justify-center items-center h-screen">
      <UpdateUserComponent data={data} />
    </div>
  )
}
