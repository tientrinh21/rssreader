import logo from '@/assets/origomi-logo.svg'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { User } from '@/lib/types'
import { getUser, isAuth } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { LoginDialog } from './dialog-login'
import { RegisterDialog } from './dialog-register'
import { ModeToggle } from './mode-toggle'
import { UserButton } from './user-button'

const navItems = [
  { title: 'Home', path: '/' },
  { title: 'Feeds', path: '/feeds' },
]

export const Navbar = () => {
  const user: User = getUser()

  return (
    <nav className="flex justify-between gap-5 p-5 sm:px-10">
      <div className="flex items-baseline pt-1">
        <HamburgerMenu />
        <Link to="/" className="mr-8 flex items-baseline gap-1 pr-10">
          <img src={logo} alt="Logo" className="h-7 self-center" />
          <h1 className="text-xl font-bold">OriGomi</h1>
        </Link>
        <div className="hidden items-baseline gap-7 sm:flex">
          {navItems.map(({ title, path }) => (
            <Link key={title} to={path} className="[&.active]:font-bold">
              {title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <ModeToggle />
        {
          isAuth() ?
            <UserButton user={user} />
            : <>
              <LoginDialog />
              <RegisterDialog />
            </>
        }
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
