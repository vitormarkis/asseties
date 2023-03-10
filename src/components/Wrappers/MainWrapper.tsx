import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const MainWrapper: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div
      className={`${className} overflow-hidden text-sm p-4 bg-white flex border border-black`}
      {...rest}
    >
      {children}
    </div>
  )
}
