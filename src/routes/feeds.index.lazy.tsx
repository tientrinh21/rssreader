import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/feeds/')({
  component: FeedsIndexComponent,
})

function FeedsIndexComponent() {
  return <div>Select a feed.</div>
}
