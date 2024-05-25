import { TokenComponent } from '@/components/user/recover/token'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Token user',
  },
}

export default function SendEmailUser() {
  return (
    <div className="flex justify-center items-center h-screen">
      <TokenComponent />
    </div>
  )
}
