import { createLazyFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
	component: IndexComponent,
})

function IndexComponent() {
	const feeds = useLoaderData({ from: '/' })

	return (
		<main>
			<h3 className="text-lg font-bold">Welcome Home!</h3>
			<div className="flex gap-2 p-2">
				<ul className="list-disc pl-4">
					{feeds.map((feed) => (
						<li key={feed.id} className="whitespace-nowrap">
							<a
								href={feed.url}
								target="_blank"
								className="block py-1 text-blue-600 hover:text-blue-400"
							>
								<div>{`${feed.name}`}</div>
							</a>
						</li>
					))}
				</ul>
			</div>
		</main>
	)
}
