import Image from 'next/image'
import { CommentForm } from '../form/commentForm'
import { FormatData } from '@/functions/formatData'
import Link from 'next/link'
import { DropdownPost } from '../other/dropdownPost'
import { ShowUser, UserInterface } from '@/actions/user/show'
import LinkPagination from '../other/LinkPagination'
import { DropdownComment } from '../other/dropdownComment'

export interface Post {
  idPost: string
  imageUrlOne: string
  description: string
  created_at: string
  idUser: string
  firstName: string
  lastName: string
  profileUrl: string
  comments: {
    idUser: string
    profileUrl: string
    firstName: string
    lastName: string
    idComment: string
    post_idPost: string
    comment: string
    created_at: string
  }[]
  rate: { idRate: string }[]
}

export const CardPostsComponent = async ({
  data,
  query,
  countPage,
}: {
  data: Post[]
  query: number
  countPage: number
}) => {
  const user: UserInterface = await ShowUser()

  return (
    <>
      {data.length > 0 &&
        data &&
        data.map((post) => (
          <div className="bg-zinc-800 min-h-32 p-6 " key={post.idPost}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {post?.profileUrl ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/user/${post?.profileUrl}`}
                    alt="Perfil"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                ) : (
                  <Image
                    src={`/user.png`}
                    alt="Perfil"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                )}
                {user && user.idUser === post.idUser ? (
                  <Link href={`/user/profile`} className="capitalize">
                    <span className="font-bold">{post.firstName}</span>{' '}
                    <span> {post.lastName}</span>
                  </Link>
                ) : (
                  <Link
                    href={`/user/profile/${post.idUser}`}
                    className="capitalize"
                  >
                    <span className="font-bold">{post.firstName}</span>{' '}
                    <span> {post.lastName}</span>
                  </Link>
                )}
              </div>
              <div className="opacity-50 flex items-center gap-2">
                <span className="text-sm">{FormatData(post.created_at)}</span>
                {user && user.idUser === post.idUser && (
                  <DropdownPost idPost={post.idPost} />
                )}
              </div>
            </div>
            <div className="mt-4 text-white text-justify break-words">
              <p>{post.description}</p>
              {post.imageUrlOne && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/post/${post.imageUrlOne}`}
                  alt="Image post"
                  width={550}
                  height={550}
                  className="object-scale-down mx-auto max-w-96 max-h-96 py-2 max-md:max-w-full max-md:max-h-80"
                />
              )}
            </div>
            {post.comments.length > 0 && (
              <div className="mt-4 text-justify bg-zinc-700 rounded-lg max-w-full">
                <h2 className="px-3 py-2 font-semibold">Comentários</h2>
                {post.comments.map((comment) => (
                  <div key={comment.idComment} className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {user &&
                        user.idUser === comment.idUser &&
                        comment?.profileUrl ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_ROUTE_STORAGE_FILES}/user/${comment?.profileUrl}`}
                            alt="Perfil"
                            width={30}
                            height={30}
                            className="rounded-lg"
                          />
                        ) : (
                          <Image
                            src={`/user.png`}
                            alt="Perfil"
                            width={30}
                            height={30}
                            className="rounded-lg"
                          />
                        )}
                        {comment.idUser && (
                          <Link
                            href={`/user/profile/${comment.idUser}`}
                            className="capitalize"
                          >
                            <span className="font-bold">
                              {comment.firstName}
                            </span>{' '}
                            <span> {comment.lastName}</span>
                          </Link>
                        )}
                      </div>
                      <div className="opacity-50 flex items-center gap-1">
                        <span className="text-sm">
                          {FormatData(comment.created_at)}
                        </span>
                        {user && user.idUser === comment.idUser && (
                          <DropdownComment idComment={comment.idComment} />
                        )}
                      </div>
                    </div>
                    <div className="text-wrap break-words text-justify">
                      <p className="min-h-5 ml-[38px]">{comment.comment}</p>
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
      <LinkPagination query={query} countPage={countPage} />
    </>
  )
}
