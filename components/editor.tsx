'use client'

import React, { FC } from 'react'
import { useTheme } from 'next-themes'
import { BlockNoteEditor } from '@blocknote/core'
import { BlockNoteView, useBlockNote } from '@blocknote/react'

import { useEdgeStore } from '~/lib/edgestore'

import '@blocknote/core/style.css'

type EditorProps = {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}

const Editor: FC<EditorProps> = ({ onChange, initialContent, editable }): JSX.Element => {
  const { resolvedTheme } = useTheme()
  const { edgestore } = useEdgeStore()

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file
    })

    return response.url
  }

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
    },
    uploadFile: handleUpload
  })

  return (
    <div>
      <BlockNoteView editor={editor} theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
    </div>
  )
}

export default Editor
