import { User as UserIcon, LogOut as LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import type { User } from '@/lib/types'
import { Button } from './ui/button'

export function UserButton(props: { user: User }) {
  const [isHovered, setIsHovered] = useState(false)

  function logout() {
    localStorage.removeItem("user")
    // window.location.reload()
  }

  return (
    <Button
      className='font-bold w-28 overflow-hidden'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={logout}
    >
      {isHovered ?
        <span className='flex place-items-center text-blue-700'><LogOutIcon className="mr-2 h-4 w-4" /> Logout</span>
        : <span className='flex place-items-center'><UserIcon className="mr-2 h-4 w-4" /> {props.user.name}</span>}
    </Button>
  )
}
