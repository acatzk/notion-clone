'use client'

import Link from 'next/link'
import React, { FC } from 'react'
import { ArrowRight } from 'lucide-react'
import { useConvexAuth } from 'convex/react'

import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/spinner'
import { SignInButton } from '@clerk/clerk-react'

type Props = Record<string, unknown>

const Heading: FC<Props> = (): JSX.Element => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{' '}
        <span className="underline">Notion Clone</span>
      </h1>
      <h3>
        Notion Clone is the connected workspace where <br /> better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Notion
            <ArrowRight className="h-4 w-4 ml-4" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton>
          <Button>
            Get Notion Free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}

export default Heading
