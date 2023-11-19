import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React, { FC, ReactNode } from 'react'

import '~/styles/globals.css'
import { ThemeProvider } from '~/components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notion Clone',
  description: 'The connected workspace where better, faster works happens.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
        href: '/logo.svg'
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
        href: '/logo-dark.svg'
      }
    ]
  }
}

type RootTypeProps = {
  children: ReactNode
}

const RootLayout: FC<RootTypeProps> = ({ children }): JSX.Element => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="notion-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
