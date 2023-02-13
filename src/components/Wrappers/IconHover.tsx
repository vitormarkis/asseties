import clsx from "clsx"
import { HTMLAttributes, useState } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export const IconHover:React.FC<Props> = ({ children, className }) => {
  const [ordering, setOrdering] = useState(false)

    return (
        <div 
        onClick={() => setOrdering(old => !old)}
        className={clsx(`${className} p-1 hover:bg-black/10 flex items-center h-8 w-8 justify-center rounded-full`, {
            "bg-black/10": ordering,
        })}>
            {children}
        </div>
    )
}