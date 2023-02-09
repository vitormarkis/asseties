import { HTMLAttributes } from "react"

interface Props {
  children: React.ReactNode
  parentAttrs?: HTMLAttributes<HTMLDivElement>
}

const FormFieldBox: React.FC<Props> = ({ children, parentAttrs }) => {

    const { className, ...restParentAttrs } = parentAttrs || {}
    
  return (
    <div
    className={`w-full py-1 px-3 rounded-sm shadow-sh bg-white ${className ?? ''}`}
    {...restParentAttrs}
    >
      {children}
    </div>
  )
}

export default FormFieldBox
