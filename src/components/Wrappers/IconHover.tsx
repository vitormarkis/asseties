import clsx from "clsx"
import { HTMLAttributes, useState } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    active?: boolean
}

export const IconHover:React.FC<Props> = ({ children, className, onClick, active, ...rest }) => {
  const [activeState, setActiveState] = useState(false)

    return (
        <div 
        onClick={event => {
            if(!active) setActiveState(oldValue => !oldValue)
            if(onClick) onClick(event)
        }}
        className={clsx(`${className} cursor-pointer p-1 hover:bg-black/10 flex items-center h-8 w-8 justify-center rounded-full`, {
            "bg-black/10": active ?? activeState,
        })}
        {...rest}
        >
            {children}
        </div>
    )
}