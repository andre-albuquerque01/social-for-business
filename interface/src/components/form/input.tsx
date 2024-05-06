interface InputProps {
  type: string
  label: string
  id: string
  name: string
  required: boolean
}

export const InputComponent = ({ ...props }: InputProps) => {
  return (
    <div className="flex flex-col text-white">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        className="bg-transparent border p-1.5 outline-none text-white rounded-lg w-96 max-sm:w-80"
        required={props.required}
      />
    </div>
  )
}
