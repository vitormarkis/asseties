import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Circle: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div
      className={`${className} shrink-0 text-white font-black cursor-pointer rounded-full w-3 h-3 relative`}
      {...rest}
    >
      {children}
    </div>
  )
}
