import * as Dialog from "@radix-ui/react-dialog"
import React, { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  action: React.ReactNode | string
  event?: () => void
  element?: React.ReactNode
  type?: "button" | "submit" | "reset"
}
const PopoverButton: React.FC<Props> = ({ action, event, element, type = "button" }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        type={type}
        onClick={event}
        className="text-sm px-2 py-1 text-slate-200 border-t-slate-700 border-t text-left flex items-center last-of-type:border-b border-b-slate-700 hover:bg-slate-700"
      >
        <div>{action}</div>
      </Dialog.Trigger>
      {element ? <Dialog.Portal>{element}</Dialog.Portal> : null}
    </Dialog.Root>
  )
}

export default PopoverButton
