import { VerifyEmail } from '@/actions/user/verifyEmail'
import { LoginComponent } from '@/components/user/login/login'
import Image from 'next/image'

export default async function Home({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  let req: string = ''
  if (searchParams.q) {
    const { q } = searchParams
    req = await VerifyEmail(q)
  }

  return (
    <div className="h-screen max-w-[1200px] mx-auto flex gap-2 max-md:flex-col max-md:items-center max-md:justify-evenly">
      <div className="w-[48%] flex justify-center items-center max-sm:hidden">
        <Image
          src={'/socialMidia.jpg'}
          alt="Imagem"
          width={800}
          height={500}
          className="w-auto h-auto p-4 max-sm:hidden overflow-hidden"
        />
      </div>
      <div className="md:w-[48%] max-md:w-auto flex justify-center items-center">
        <LoginComponent message={req} />
      </div>
    </div>
  )
}
