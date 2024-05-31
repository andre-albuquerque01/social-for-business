import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-white text-2xl">
        Olá! Infelizmente não encontramos esta rota.
      </h1>
      <Link href="/" className="underline text-blue-600">
        Voltar para o inicio
      </Link>
    </div>
  )
}
