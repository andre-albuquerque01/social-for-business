interface BtnProps {
  title: string
}

export const ButtonComponent = ({ ...props }: BtnProps) => {
  return (
    <button className="bg-red-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg">
      {props.title}
    </button>
  )
}
