import { Navbar } from '../components/navbar'
// import { Footer } from '../components/Footer'
import { Toaster } from 'react-hot-toast'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Navbar />
      <main className="px-5 sm:px-10">
        <Outlet />
      </main>
      {/* <Footer /> */}
      <Toaster />
      {/* <ReactQueryDevtools /> */}
      {/* <TanStackRouterDevtools /> */}
    </>
  )
}
