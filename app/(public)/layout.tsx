import React, { FC, ReactNode } from 'react'

type PublicLayoutProps = {
  children: ReactNode
}

const PublicLayout: FC<PublicLayoutProps> = ({ children }): JSX.Element => {
  return <div className="h-full dark:bg-[#1F1F1F]">{children}</div>
}

export default PublicLayout
