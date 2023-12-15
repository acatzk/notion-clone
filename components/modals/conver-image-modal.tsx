'use client'

import { useMutation } from 'convex/react'
import React, { FC, useState } from 'react'
import { useParams } from 'next/navigation'

import { api } from '~/convex/_generated/api'
import { useEdgeStore } from '~/lib/edgestore'
import { Id } from '~/convex/_generated/dataModel'
import { useConverImage } from '~/hooks/use-cover-image'
import { SingleImageDropzone } from '~/components/single-image-dropzone'
import { Dialog, DialogContent, DialogHeader } from '~/components/ui/dialog'

export const ConverImageModal: FC = (): JSX.Element => {
  const params = useParams()
  const coverImage = useConverImage()
  const { edgestore } = useEdgeStore()
  const update = useMutation(api.documents.update)

  const [file, setFile] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onChange = async (file?: File): Promise<void> => {
    if (file) {
      setIsSubmitting(true)
      setFile(file)

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url
        }
      })

      await update({
        id: params.documentId as Id<'documents'>,
        coverImage: res.url
      })

      onClose()
    }
  }

  const onClose = (): void => {
    setFile(undefined)
    setIsSubmitting(false)
    coverImage.onClose()
  }

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  )
}
