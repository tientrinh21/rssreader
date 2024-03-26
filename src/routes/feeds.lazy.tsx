import { createLazyFileRoute, useLoaderData, Link, Outlet } from '@tanstack/react-router'
import type { Feed } from '@/lib/types'

export const Route = createLazyFileRoute('/feeds')({
  component: FeedsComponent,
})

function FeedsComponent() {
  const feeds: Feed[] = useLoaderData({ from: '/feeds' })

  return (
    <main>
      <h3 className="text-lg font-bold">Feeds List</h3>
      <div className="flex gap-8 p-2 pr-0">
        <ul className="list-disc ml-4 mr-8">
          {feeds.map((feed) => (
            <li key={feed.id} className="whitespace-nowrap">
              <Link
                to="/feeds/$feedId"
                params={{ feedId: feed.id }}
                className="block py-1 text-primary hover:text-blue-500"
                activeProps={{ className: 'font-bold' }}
              >
                <div>{`${feed.name}`}</div>
              </Link>
            </li>
          ))}
        </ul>
        {/* <hr /> */}
        <Outlet />
      </div>
    </main>
  )
}
