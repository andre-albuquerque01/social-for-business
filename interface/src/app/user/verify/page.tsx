import { VerifyEmailSendComponent } from '@/components/user/verify/sendEmailVerify'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Verificar usuário',
  },
}

export default function VerifyEmail() {
  return (
    <div className="flex justify-center items-center h-screen">
      <VerifyEmailSendComponent />
    </div>
  )
}
