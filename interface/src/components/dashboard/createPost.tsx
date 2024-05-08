export const CreatePost = () => {
  return (
    <div className="bg-zinc-800 h-auto p-4 rounded-lg">
      <form action="">
        <textarea
          name="description"
          id="description"
          className="w-[100%] bg-zinc-600 p-3 outline-none rounded-lg"
          placeholder="Começar publicação..."
          rows={5}
        ></textarea>
        <div className="flex justify-between items-center">
          <input
            type="file"
            name="imageUrlOne"
            id="imageUrlOne"
            className="text-sm text-stone-500
            file:mr-5 file:py-1 file:px-3 file:border-[1px]
            file:text-xs file:font-medium
            file:bg-stone-50 file:text-stone-700
            hover:file:cursor-pointer hover:file:bg-blue-50
            hover:file:text-blue-700"
          />
          <button className="bg-blue-600 text-white px-4 py-2 w-32 rounded-lg">
            Postar
          </button>
        </div>
      </form>
    </div>
  )
}
