import * as Dialog from "@radix-ui/react-dialog"
import React, { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  action: React.ReactNode | string
  event?: () => void
  element?: React.ReactNode
}
const PopoverButton = React.forwardRef<HTMLButtonElement, Props>(function PopoverButton(props, ref) {
  const { action, event, element } = props

  return (
    <Dialog.Root>
      <Dialog.Trigger
        ref={ref}
        className="px-1 py-0.5 text-slate-200 border-t-slate-700 border-t text-left flex items-center last-of-type:border-b border-b-slate-700 hover:bg-slate-700"
      >
        <button onClick={event}>{action}</button>
      </Dialog.Trigger>
      {element && <Dialog.Portal>{element}</Dialog.Portal>}
    </Dialog.Root>
  )
})

export default PopoverButton
