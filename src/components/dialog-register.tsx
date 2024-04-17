"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { createUser } from "@/lib/request"
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
  name: z.string().min(2, {
    message: "Your name must be at least 2 characters",
  })
})

export function RegisterForm(props: { setOpenDialog: (openDialog: boolean) => void }) {
  // 1. Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // 2. Define a submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await createUser(values.name)
      props.setOpenDialog(false)


      toast.custom((t) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-fit w-full bg-background  border-[1px] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex flex-col place-items-center gap-2 p-4 w-full">
            <span className="text-primary font-semibold">✅ Register successful!</span>
            <span className="text-primary text-sm">Please store the API key, you only see it once.</span>

            <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
              <span className="text-white">{user.apiKey}</span>
            </pre>
          </div>
        </div>
      ))
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  }

  return (
    <Form {...form}>
      <form id="register" onSubmit={form.handleSubmit(onSubmit)} className="my-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Name</FormLabel>
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


export function RegisterDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Input your name here
          </DialogDescription>
        </DialogHeader>

        <RegisterForm setOpenDialog={setOpen} />

        <DialogFooter>
          <DialogClose asChild>
            <Button form='register' type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" form="register">Next</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
