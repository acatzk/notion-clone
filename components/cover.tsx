import Image from 'next/image'
import React, { FC } from 'react'
import { useMutation } from 'convex/react'
import { ImageIcon, X } from 'lucide-react'
import { useParams } from 'next/navigation'

import { cn } from '~/lib/utils'
import { api } from '~/convex/_generated/api'
import { Button } from '~/components/ui/button'
import { Id } from '~/convex/_generated/dataModel'
import { useConverImage } from '~/hooks/use-cover-image'

type Props = {
  url?: string
  preview?: boolean
}

export const Cover: FC<Props> = ({ url, preview }): JSX.Element => {
  const params = useParams()
  const coverImage = useConverImage()
  const removeCoverImage = useMutation(api.documents.removeCoverImage)

  const onRemove = () => {
    removeCoverImage({
      id: params.documentId as Id<'documents'>
    })
  }

  return (
    <div className={cn('relative w-full h-[35vh] group', !url && 'h-[12vh]', url && 'bg-muted')}>
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" priority={false} />}
      {!!url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}
