'use client'

import Image from 'next/image'
import { toast } from 'sonner'
import React, { FC } from 'react'
import { useMutation } from 'convex/react'
import { useUser } from '@clerk/clerk-react'
import { PlusCircleIcon } from 'lucide-react'

import { api } from '~/convex/_generated/api'
import { Button } from '~/components/ui/button'

type Props = Record<string, unknown>

const DocumentsPage: FC<Props> = (): JSX.Element => {
  const { user } = useUser()
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({ title: 'Untitled' })

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create a new note.'
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image src="/empty.png" height="300" width="300" alt="Empty" className="dark:hidden" />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">Welcome to {user?.firstName}&apos;s Notion Clone</h2>
      <Button onClick={onCreate}>
        <PlusCircleIcon className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  )
}

export default DocumentsPage
