import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { fetchFeeds } from '@/lib/request'

const feedsQueryOptions = queryOptions({
  queryKey: ['/feeds'],
  queryFn: () => fetchFeeds(),
})

export const Route = createFileRoute('/feeds')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(feedsQueryOptions),
})
