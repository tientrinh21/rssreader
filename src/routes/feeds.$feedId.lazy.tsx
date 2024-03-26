import type { Post } from '@/lib/types'
import { createLazyFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/feeds/$feedId')({
  component: FeedComponent,
})


function FeedComponent() {
  const posts: Post[] = useLoaderData({ from: '/feeds/$feedId' })

  return (
    <div>
      <PostsSection posts={posts} />
    </div>
  )
}

function PostsSection({ posts }: { posts: Post[] }) {
  return (
    <ul className='flex flex-col space-y-4'>
      {posts.map((post) => (
        <li key={post.id}><PostCard post={post} /></li>
      ))}
    </ul>
  )
}

function PostCard({ post }: { post: Post }) {

  return (
    <a className="flex items-center hover:bg-muted justify-between gap-10 space-x-4 border-2 px-5 py-4 rounded-lg hover:" href={post.url} target='_blank'>
      <div className="space-y-2">
        <h3 className='font-bold text-lg'>{post.title}</h3>
        <p className='text-sm text-muted-foreground'>{post.description.Valid ? post.description.String : ""}</p>
      </div>

      {!!post.thumbnailUrl.Valid &&
        <img className="max-h-20" src={post.thumbnailUrl.String} alt='Thumbnail' />
      }
    </a>
  )
}
