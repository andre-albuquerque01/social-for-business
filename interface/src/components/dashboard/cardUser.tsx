import { ShowUser, UserInterface } from '@/actions/user/show'
import Image from 'next/image'
import Link from 'next/link'
import { LogoutComponent } from '../user/logout/logout'
import { BackDashboardComponent } from './backDashboard'

export const CardUserComponent = async () => {
  const dt = await ShowUser()
  const data: UserInterface = dt.data

  return (
    <div className="h-96 bg-zinc-800 rounded-lg flex flex-col justify-between">
      <div className="overflow-hidden">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTURbIoeJgEiJYffLbcmddMTSvsoPSmxK4f2g&usqp=CAU"
          alt="Capa"
          width={300}
          height={100}
          className="h-20 w-full object-cover rounded-t-lg"
        />
        <div className="transform mx-auto mt-[-40px] w-20 h-20 border-2 p-0.5 rounded-lg border-cyan-300">
          <Image
            src="https://64.media.tumblr.com/12aa1a7599fb0ec8d2119d703c4881d2/9e68b8ad9b63ca7a-f8/s640x960/16d2f126195fe06cefa6017d5805d2464c62d548.jpg"
            alt="Perfil"
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>
        <Link href="/user/profile">
          <h1 className="text-center mt-5 font-bold uppercase">
            {data?.firstName}
          </h1>
          <p className="text-center">{data?.lastName}</p>
        </Link>
      </div>
      <div className="h-auto border-t border-zinc-600 flex flex-col items-center justify-evenly gap-3 p-3">
        <BackDashboardComponent />
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
