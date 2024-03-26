import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { fetchPosts } from '@/lib/request'

const postsQueryOptions = (feedId: string) =>
  queryOptions({
    queryKey: ['/feeds', { feedId }],
    queryFn: () => fetchPosts(feedId),
  })

export const Route = createFileRoute('/feeds/$feedId')({
  loader: ({ context: { queryClient }, params: { feedId } }) =>
    queryClient.ensureQueryData(postsQueryOptions(feedId)),
})
