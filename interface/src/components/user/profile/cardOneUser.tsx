import Image from 'next/image'
import Link from 'next/link'
import { LogoutComponent } from '../logout/logout'
import { BackDashboardComponent } from '@/components/dashboard/backDashboard'

interface UserProps {
  firstName: string
  lastName: string
  profileUrl: string
  coverPhotoUrl: string
}

export const CardOneUserComponent = async ({ ...props }: UserProps) => {
  return (
    <div className="h-auto bg-zinc-800 rounded-lg flex flex-col justify-between">
      <div className="overflow-hidden">
        {props.coverPhotoUrl ? (
          <Image
            src={`http://localhost/storage/img/user/${props.coverPhotoUrl}`}
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
          {props.profileUrl ? (
            <Image
              src={`http://localhost/storage/img/user/${props.profileUrl}`}
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
        <h1 className="text-center mt-5 font-bold uppercase">
          {props.firstName}
        </h1>
        <p className="text-center">{props.lastName}</p>
      </div>
      <div className="h-auto border-t border-zinc-600 flex flex-col items-center justify-evenly gap-3 p-3 mt-4">
        <BackDashboardComponent />
        <Link
          href={`/user/profile`}
          className="text-center w-40 py-2 border border-zinc-600 transform duration-500 hover:bg-zinc-900 rounded-md"
        >
          Meu perfil
        </Link>
        <LogoutComponent />
      </div>
    </div>
  )
}
