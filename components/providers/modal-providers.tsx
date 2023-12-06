'use client'

import { useEffect, useState } from 'react'

import { SettingsModal } from '~/components/modals/settings-modal'

export const ModalProvider = (): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <SettingsModal />
    </>
  )
}
