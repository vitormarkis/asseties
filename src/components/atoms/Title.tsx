import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const Title: React.FC<Props> = ({ children, className }) => {
  return <h1 className={`text-lg text-zinc-600 tracking-wide leading-4 mb-2 ${className}`}>{children}</h1>
}

export default Title
