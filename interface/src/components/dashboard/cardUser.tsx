import { ShowUser, UserInterface } from '@/actions/user/show'
import Image from 'next/image'
import Link from 'next/link'
import { LogoutComponent } from '../user/logout/logout'
import { BackDashboardComponent } from './backDashboard'

export const CardUserComponent = async () => {
  const data: UserInterface = await ShowUser()

  return (
    <div className="h-auto bg-zinc-800 rounded-lg flex flex-col justify-between">
      <div className="overflow-hidden">
        {data?.coverPhotoUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/user/${data?.coverPhotoUrl}`}
            alt="Capa"
            width={300}
            height={100}
            className="h-20 w-full object-cover rounded-t-lg"
          />
        ) : (
          <Image
            src={`/cover.jpg`}
            alt="Capa"
            width={300}
            height={100}
            className="h-20 w-full object-cover rounded-t-lg"
          />
        )}
        <div className="transform mx-auto mt-[-40px] w-20 h-20 border-2 p-0.5 rounded-lg border-cyan-300">
          {data?.profileUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/user/${data?.profileUrl}`}
              alt="Perfil"
              width={80}
              height={80}
              className="rounded-lg"
            />
          ) : (
            <Image
              src={`/user.png`}
              alt="Perfil"
              width={80}
              height={80}
              className="rounded-lg"
            />
          )}
        </div>
        <Link href="/user/profile" className="">
          <h1 className="text-center mt-5 font-bold uppercase">
            {data?.firstName}
          </h1>
          <p className="text-center">{data?.lastName}</p>
        </Link>
      </div>
      <div className="h-auto border-t border-zinc-600 flex flex-col items-center justify-evenly gap-3 p-3 mt-4 max-md:grid max-md:mx-auto max-md:grid-cols-2">
        <BackDashboardComponent />
        <Link
          href={`/user/profile`}
          className="text-center w-40 py-2 border border-zinc-600 transform duration-500 hover:bg-zinc-900 rounded-md"
        >
          Meu perfil
        </Link>
        <Link
          href={`/user/update`}
          className="text-center w-40 py-2 border border-zinc-600 transform duration-500 hover:bg-zinc-900 rounded-md"
        >
          Editar perfil
        </Link>
        <LogoutComponent />
      </div>
    </div>
  )
}
