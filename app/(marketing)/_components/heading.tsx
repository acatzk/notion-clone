'use client'

import { ArrowRight } from 'lucide-react'
import React, { FC } from 'react'

import { Button } from '~/components/ui/button'

type Props = Record<string, unknown>

const Heading: FC<Props> = (): JSX.Element => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{' '}
        <span className="underline">Notion Clone</span>
      </h1>
      <h3>
        Notion Clone is the connected workspace where <br /> better, faster work happens.
      </h3>
      <Button>
        Enter Notion
        <ArrowRight className="h-4 w-4 ml-4" />
      </Button>
    </div>
  )
}

export default Heading
