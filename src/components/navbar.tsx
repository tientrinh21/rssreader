import { Menu } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { DialogLogin } from './dialog-login'
import { ModeToggle } from './mode-toggle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import logo from '@/assets/origomi-logo.svg'

const navItems = [
  { title: 'Home', path: '/' },
  { title: 'Feeds', path: '/feeds' },
]

export const Navbar = () => {
  return (
    <nav className="flex justify-between gap-5 p-5 sm:px-10">
      <div className="flex items-baseline pt-1">
        <HamburgerMenu />
        <Link to="/" className="mr-8 flex items-baseline gap-1">
          <img src={logo} alt="Logo" className="h-7 self-center" />
          <h1 className="text-xl font-bold">OriGomi</h1>
        </Link>
        <div className="hidden items-baseline gap-3 sm:flex">
          {navItems.map(({ title, path }) => (
            <Link to={path} className="[&.active]:font-bold">
              {title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <ModeToggle />
        <DialogLogin />
      </div>
    </nav>
  )
}

function HamburgerMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="mr-2 flex sm:hidden"
        >
          <Menu className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/feeds" className="[&.active]:font-bold">
            Feeds
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
