import UpdateUserComponent from '@/components/user/update/update'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Insert user',
  },
}

export default function UpdateUser() {
  return (
    <div className="flex justify-center items-center h-screen">
      <UpdateUserComponent />
    </div>
  )
}
