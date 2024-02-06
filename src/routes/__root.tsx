import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Navbar } from '../components/navbar'
import { Footer } from '../components/footer'

export const Route = createRootRoute({
	component: Root,
})

function Root() {
	return (
		<>
			<Navbar />
			<Outlet />
			{/* <Footer /> */}
			<TanStackRouterDevtools />
		</>
	)
}
