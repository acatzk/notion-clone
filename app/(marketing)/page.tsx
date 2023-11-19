import React, { FC } from 'react'

import Heroes from './_components/heroes'
import Footer from './_components/footer'
import Heading from './_components/heading'

type Props = Record<string, unknown>

const MarketingPage: FC<Props> = (): JSX.Element => {
  return (
    <div className="min-h-full flex flex-col px-4 py-4 relative">
      <div className="flex flex-col items-center justify-center md:justify-center text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  )
}

export default MarketingPage
