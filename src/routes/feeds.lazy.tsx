import { createLazyFileRoute, useLoaderData, Link, Outlet } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/feeds')({
  component: FeedsComponent,
})

function FeedsComponent() {
  const feeds = useLoaderData({ from: '/feeds' })

  return (
    <main>
      <h3 className="text-lg font-bold">Feeds List</h3>
      <div className="flex gap-4 p-2">
        <ul className="list-disc pl-4">
          {feeds.map((feed) => (
            <li key={feed.id} className="whitespace-nowrap">
              <Link
                to="/feeds/$feedId"
                params={{ feedId: feed.id }}
                className="block py-1 text-blue-600 hover:text-blue-400"
              >
                <div>{`${feed.name}`}</div>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <Outlet />
      </div>
    </main>
  )
}
