import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export const MainWrapper:React.FC<Props> = ({ children, className, ...rest }) => {
    return (
        <div className={`${className} text-sm p-4 rounded-lg bg-zinc-200 flex`} {...rest}>
            {children}
        </div>
    )
}