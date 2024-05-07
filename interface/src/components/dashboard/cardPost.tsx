import Image from 'next/image'

export const CardPostsComponent = () => {
  return (
    <div className="bg-zinc-800 min-h-32 p-6">
      <div className="">
        <span className="uppercase font-bold">Aqua</span> Atacante
      </div>
      <div className="mt-4 text-justify">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
        tempore dignissimos dolor provident eligendi modi illo? Asperiores velit
        exercitationem voluptatem. Cupiditate iste ducimus ut nesciunt dolor.
        Modi hic quos porro!
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sBJBIfQ8eG49ACgcJGpIfiGBXksA_-CayA&usqp=CAU"
          alt="Image post"
          width={550}
          height={550}
          className="object-scale-down mx-auto w-80 h-80"
        />
      </div>
      <div className="bg-zinc-700 h-auto p-4 rounded-lg">
        <form action="">
          <textarea
            name="description"
            id="description"
            className="w-[100%] bg-zinc-600 p-3 outline-none rounded-lg"
            placeholder="Começar comentar..."
            rows={3}
          ></textarea>
          <button className="bg-blue-600 text-white px-4 py-2 w-32 rounded-lg">
            Comentar
          </button>
        </form>
      </div>
    </div>
  )
}
