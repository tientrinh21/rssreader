import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// import { createFeed } from '@/lib/request'
import type { Feed } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, Outlet, createLazyFileRoute, useLoaderData } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

export const Route = createLazyFileRoute('/feeds')({
  component: FeedsComponent,
})

function FeedsComponent() {
  const feeds: Feed[] = useLoaderData({ from: '/feeds' })

  return (
    <main>
      <h3 className="text-lg font-bold">Feeds List</h3>
      <div className="flex gap-8 p-2 pr-0">
        <ul className="list-disc ml-4 mr-8">
          {feeds.map((feed) => (
            <li key={feed.id} className="whitespace-nowrap">
              <Link
                to="/feeds/$feedId"
                params={{ feedId: feed.id }}
                className="block py-1 text-primary hover:text-blue-500"
                activeProps={{ className: 'font-bold' }}
              >
                <div>{`${feed.name}`}</div>
              </Link>
            </li>
          ))}
        </ul>
        <Outlet />
      </div>

      {!!localStorage.getItem("user") && <AddFeedDialog />}
    </main>
  )
}

function AddFeedDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button size="icon" className='rounded-full fixed bottom-8 right-5'><PlusIcon /></Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side='left' className='bg-primary'>
            <p className='text-primary-foreground'>Add new feed</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Feed</DialogTitle>
          <DialogDescription>
            Input the feed name and the RSS link of the feed.
          </DialogDescription>
        </DialogHeader>

        <AddFeedForm setOpenDialog={setOpen} />

        <DialogFooter>
          <DialogClose asChild>
            <Button form='add-feed' type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" form="add-feed">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  feedName: z.string().min(2, {
    message: "Feed name should be more than 1 character",
  }),
  feedURL: z.string().url({ message: "Invalid URL" })
})

function AddFeedForm(props: { setOpenDialog: (openDialog: boolean) => void }) {
  // 1. Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedName: "",
      feedURL: ""
    },
  })
  async function onSubmit(data: z.infer<typeof formSchema>) {
    // TODO: Do something
    try {
      // const feed = await createFeed()

      props.setOpenDialog(false)
      toast(JSON.stringify(data, null, 2))
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  }

  return (
    <Form {...form}>
      <form id="add-feed" onSubmit={form.handleSubmit(onSubmit)} className="my-2">
        <FormField
          control={form.control}
          name="feedName"
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
        <FormField
          control={form.control}
          name="feedURL"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">URL</FormLabel>
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
