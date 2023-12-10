'use client'

import React from 'react'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import { MoreHorizontal, Trash } from 'lucide-react'

import { api } from '~/convex/_generated/api'
import { Button } from '~/components/ui/button'
import { Id } from '~/convex/_generated/dataModel'
import { Skeleton } from '~/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator
} from '~/components/ui/dropdown-menu'

type MenuProps = {
  documentId: Id<'documents'>
}

export const Menu = ({ documentId }: MenuProps): JSX.Element => {
  const router = useRouter()
  const { user } = useUser()

  const archive = useMutation(api.documents.archive)

  const onArchive = (): void => {
    const promise = archive({ id: documentId })

    toast.promise(promise, {
      loading: 'Moving to trash...',
      success: 'Note moved to trash!',
      error: 'Failed to archive note.'
    })

    router.push('/documents')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">Last edited by: {user?.fullName}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />
}
