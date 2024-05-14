import Image from 'next/image'
import { FormatData } from '@/functions/formatData'
import { CommentForm } from '@/components/form/commentForm'
import { ShowProfilePost } from '@/actions/user/profilePost'

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

export const ProfilePostComponent = async () => {
  const data: Post[] = await ShowProfilePost()

  return (
    <>
      {data &&
        data.map((post) => (
          <div className="bg-zinc-800 min-h-32 p-6 " key={post.idPost}>
            <div className="flex justify-between items-center">
              <div className="">
                <span className="uppercase font-bold">{post.firstName}</span>{' '}
                <span> {post.lastName}</span>
              </div>
              <div className="opacity-50">{FormatData(post.created_at)}</div>
            </div>
            <div className="mt-4 text-white text-justify break-words">
              <p>{post.description}</p>
              {post.imageUrlOne && (
                <Image
                  // src={`/mnt/069E34C19E34AB57/SocialMidia/Api/storage/app/public/img/${post.imageUrlOne}`}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sBJBIfQ8eG49ACgcJGpIfiGBXksA_-CayA&usqp=CAU"
                  alt="Image post"
                  width={550}
                  height={550}
                  className="object-scale-down mx-auto w-80 h-80"
                />
              )}
            </div>
            {post.comments.length > 0 && (
              <div className="mt-4 text-justify bg-zinc-700 rounded-lg max-w-full">
                <h2 className="px-3 font-semibold">Comentários</h2>
                {post.comments.map((comment) => (
                  <div key={comment.idComment} className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="uppercase font-bold">
                          {comment.firstName}
                        </span>{' '}
                        <span> {comment.lastName}</span>
                      </div>
                      <div className="text-sm opacity-50">
                        {FormatData(comment.created_at)}
                      </div>
                    </div>
                    <div className="text-wrap break-words text-justify">
                      <p className="min-h-5">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-zinc-700 h-auto p-4 rounded-lg mt-2">
              <CommentForm idPost={post.idPost} />
            </div>
          </div>
        ))}
    </>
  )
}
