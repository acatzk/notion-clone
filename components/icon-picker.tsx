'use client'

import { useTheme } from 'next-themes'
import React, { FC, ReactNode } from 'react'
import EmojiPicker, { Theme } from 'emoji-picker-react'

import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'

type Props = {
  onChange: (icon: string) => void
  children: ReactNode
  asChild?: boolean
}

export const IconPicker: FC<Props> = ({ onChange, children, asChild }): JSX.Element => {
  const { resolvedTheme } = useTheme()
  const currentTheme = (resolvedTheme || 'light') as keyof typeof themeMap

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT
  }

  const theme = themeMap[currentTheme]

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker height={350} theme={theme} onEmojiClick={(data) => onChange(data.emoji)} />
      </PopoverContent>
    </Popover>
  )
}
