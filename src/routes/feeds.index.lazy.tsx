import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/feeds/')({
  component: FeedsIndexComponent,
})

function FeedsIndexComponent() {
  return (
    <div className='text-center w-full pt-5'>
      <span className='font-bold text-lg'>Select a feed.</span>
    </div>
  )
}
