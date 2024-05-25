import { SendEmailComponent } from '@/components/user/recover/email'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Recover user',
  },
}

export default function SendEmailUser() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SendEmailComponent />
    </div>
  )
}
