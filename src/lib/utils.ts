import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { User } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAuth() {
  const encodedUser = localStorage.getItem('user')
  return !!encodedUser
}

export function getUser() {
  const encodedUser = localStorage.getItem('user')
  if (!encodedUser) return
  const user: User = JSON.parse(atob(encodedUser as string))
  return user
}
