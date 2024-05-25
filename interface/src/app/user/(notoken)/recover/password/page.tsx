import { UpdatePasswordComponent } from '@/components/user/recover/password'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'update password',
  },
}

export default function UpdatePasswordUser() {
  return (
    <div className="flex justify-center items-center h-screen">
      <UpdatePasswordComponent />
    </div>
  )
}
