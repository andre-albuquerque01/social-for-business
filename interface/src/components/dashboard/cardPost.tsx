import { ShowPost } from '@/actions/post/show'
import Image from 'next/image'

interface Post {
  idPost: string
  imageUrlOne: string
  description: string
  created_at: string
  idUser: string
  firstName: string
  lastName: string
  comments: {
    firstName: string
    lastName: string
    idComment: string
    post_idPost: string
    comment: string
    created_at: string
  }[]
  rate: { idRate: string }[]
}

export const CardPostsComponent = async () => {
  const data: Post[] = await ShowPost()

  return (
    <>
      {data &&
        data.map((post) => (
          <div
            className="bg-zinc-800 min-h-32 p-6 max-md:w-full"
            key={post.idPost}
          >
            <div className="">
              <span className="uppercase font-bold">{post.firstName}</span>{' '}
              <span> {post.lastName}</span>
            </div>
            <div className="mt-4 text-white text-justify">
              <p style={{ wordWrap: 'break-word' }}>{post.description}</p>
              {post.imageUrlOne && (
                <Image
                  // src={`${post.imageUrlOne}`}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sBJBIfQ8eG49ACgcJGpIfiGBXksA_-CayA&usqp=CAU"
                  alt="Image post"
                  width={550}
                  height={550}
                  className="object-scale-down mx-auto w-80 h-80"
                />
              )}
            </div>
            {post.comments.length > 0 && (
              <div className="mt-4 text-justify bg-zinc-700 rounded-lg">
                <h2 className="px-3 font-semibold">Comentários</h2>
                {post.comments.map((comment) => (
                  <div key={comment.idComment} className="p-3">
                    <div>
                      <span className="uppercase font-bold">
                        {comment.firstName}
                      </span>{' '}
                      <span> {comment.lastName}</span>
                    </div>
                    <p
                      className="min-h-5 text-justify"
                      style={{ wordWrap: 'break-word' }}
                    >
                      {comment.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-zinc-700 h-auto p-4 rounded-lg mt-2">
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
        ))}
    </>
  )
}
