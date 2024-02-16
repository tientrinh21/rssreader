import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { fetchFeeds } from '@/lib/request'

const feedsQueryOptions = queryOptions({
	queryKey: ['/'],
	queryFn: () => fetchFeeds(),
})

export const Route = createFileRoute('/')({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(feedsQueryOptions),
})
