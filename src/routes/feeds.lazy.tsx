import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/feeds')({
	component: FeedsComponent,
})

function FeedsComponent() {
	return (
		<main>
			<h2 className="text-lg font-bold">Feed List</h2>
		</main>
	)
}
