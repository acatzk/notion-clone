import React, { FC, ReactNode } from 'react'

import Navbar from './_components/navbar'

type Props = {
  children: ReactNode
}

const MarketingLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  )
}

export default MarketingLayout
