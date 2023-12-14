import { useMutation } from 'convex/react'
import { ImageIcon, Smile, X } from 'lucide-react'
import TextAreaAutosize from 'react-textarea-autosize'
import React, { ElementRef, FC, KeyboardEvent, useRef, useState } from 'react'

import { api } from '~/convex/_generated/api'
import { Doc } from '~/convex/_generated/dataModel'
import { useConverImage } from '~/hooks/use-cover-image'

import { Button } from './ui/button'
import { IconPicker } from './icon-picker'

type Props = {
  initialData: Doc<'documents'>
  preview?: boolean
}

const Toolbar: FC<Props> = ({ initialData, preview }): JSX.Element => {
  const inputRef = useRef<ElementRef<'textarea'>>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [value, setValue] = useState<string>(initialData.title)

  const update = useMutation(api.documents.update)
  const removeIcon = useMutation(api.documents.removeIcon)

  const coverImage = useConverImage()

  const enableInput = (): void => {
    if (preview) return

    setIsEditing(true)
    setTimeout(() => {
      setValue(initialData.title)
      inputRef.current?.focus()
    }, 0)
  }

  const disableInput = (): void => setIsEditing(false)

  const onInput = (value: string) => {
    setValue(value)
    update({
      id: initialData._id,
      title: value || 'Untitled'
    })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      disableInput()
    }
  }

  const onIconSelect = (icon: string): void => {
    update({
      id: initialData._id,
      icon
    })
  }

  const onRemoveIcon = (): void => {
    removeIcon({
      id: initialData._id
    })
  }

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">{initialData.icon}</p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && <p className="text-6xl pt-6">{initialData.icon}</p>}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker onChange={onIconSelect} asChild>
            <Button variant="outline" size="sm" className="text-muted-foreground text-xs">
              <Smile className="w-4 h-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextAreaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
          onClick={enableInput}
        >
          {initialData.title}
        </div>
      )}
    </div>
  )
}

export default Toolbar
