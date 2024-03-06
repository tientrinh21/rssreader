import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/feeds/$feedId')({
  component: FeedComponent,
})

function FeedComponent() {
  return <div>This is a feed content</div>
}
