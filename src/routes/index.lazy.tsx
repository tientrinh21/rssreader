import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {

  return (
    <main>
      <h3 className="text-lg font-bold">Welcome Home!</h3>
    </main>
  )
}
