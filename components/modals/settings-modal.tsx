'use client'

import React, { FC } from 'react'

import { Label } from '~/components/ui/Label'
import ModeToggle from '~/components/mode-toggle'
import { useSettings } from '~/hooks/use-settings'
import { Dialog, DialogHeader, DialogContent } from '~/components/ui/dialog'

type Props = {}

export const SettingsModal: FC<Props> = (): JSX.Element => {
  const settings = useSettings()

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Notion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  )
}
