'use client'

import { File } from 'lucide-react'
import { useQuery } from 'convex/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'

import { api } from '~/convex/_generated/api'
import {
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandDialog
} from '~/components/ui/command'

import { useSearch } from '~/hooks/use-search'

export const SearchCommand = (): JSX.Element | null => {
  const { user } = useUser()
  const router = useRouter()
  const documents = useQuery(api.documents.getSearch)

  const [isMouted, setIsMounted] = useState<boolean>(false)

  const toggle = useSearch((store) => store.toggle)
  const isOpen = useSearch((store) => store.isOpen)
  const onClose = useSearch((store) => store.onClose)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onSelect = (id: string): void => {
    router.push(`/documents/${id}`)
    onClose()
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  if (!isMouted) {
    return null
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Notion`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
