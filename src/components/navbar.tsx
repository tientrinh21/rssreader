import { Link } from '@tanstack/react-router'

export const Navbar = () => (
	<>
		<div className="flex gap-5 p-5">
			<Link to="/" className="[&.active]:font-bold">
				Home
			</Link>{' '}
			<Link to="/Feeds" className="[&.active]:font-bold">
				Feeds
			</Link>
		</div>
		<hr />
	</>
)
