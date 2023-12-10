'use client'

import { toast } from 'sonner'
import React, { FC } from 'react'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'

import { api } from '~/convex/_generated/api'
import { Button } from '~/components/ui/button'
import { Id } from '~/convex/_generated/dataModel'
import ConfirmModal from '~/components/modals/confirm-modal'

type BannerProps = {
  documentId: Id<'documents'>
}

export const Banner: FC<BannerProps> = ({ documentId }): JSX.Element => {
  const router = useRouter()

  const remove = useMutation(api.documents.remove)
  const restore = useMutation(api.documents.restore)

  const onRemove = (): void => {
    const promise = remove({ id: documentId }).then(() => router.push('/documents'))

    toast.promise(promise, {
      loading: 'Deleting note...',
      success: 'Note deleted!',
      error: 'Failed to delete note.'
    })
  }

  const onRestore = (): void => {
    const promise = restore({ id: documentId })

    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored!',
      error: 'Failed to restore note.'
    })
  }

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash.</p>
      <Button
        variant="outline"
        size="sm"
        onClick={onRestore}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          variant="outline"
          size="sm"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  )
}
