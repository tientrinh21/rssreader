"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { fetchUser } from "@/lib/request"
import { useState } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'

const formSchema = z.object({
  apiKey: z.string().length(64, {
    message: "API Key must have exactly 64 characters",
  })
})

function LoginForm(props: { setOpenDialog: (openDialog: boolean) => void }) {
  // 1. Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  })

  // 2. Define a submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await fetchUser(values.apiKey)
      localStorage.setItem("user", btoa(JSON.stringify(user)))

      props.setOpenDialog(false)
      window.location.reload()
    } catch (error) {
      toast.custom((t) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-fit w-full bg-red-500 border-[1px] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex flex-col place-items-center gap-2 p-4 w-full">
            <span className="text-primary font-semibold">No user with this API key exists ⚠️</span>
          </div>
        </div>
      ))
    }
  }

  return (
    <Form {...form}>
      <form id="login" onSubmit={form.handleSubmit(onSubmit)} className="my-2">
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">API Key</FormLabel>
              <FormControl className="col-span-3">
                <Input {...field} />
              </FormControl>
              <FormMessage className="col-span-3 col-start-2" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}


export function LoginDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Input your API Key here.
          </DialogDescription>
        </DialogHeader>

        <LoginForm setOpenDialog={setOpen} />

        <DialogFooter>
          <DialogClose asChild>
            <Button form='login' type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" form="login">Next</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
