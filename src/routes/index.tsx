import { isAuth } from '@/lib/utils'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: () => {
    if (isAuth()) {
      throw redirect({
        to: '/feeds',
      })
    }
  },
})
