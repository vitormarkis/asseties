import { HTMLAttributes, InputHTMLAttributes } from "react"
import FormFieldBox from "./FormFieldBox"

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  parentAttrs?: HTMLAttributes<HTMLDivElement>
  options: any[]
}

export const Select: React.FC<Props> = ({ parentAttrs, options, ...rest }) => {
  return (
    <FormFieldBox parentAttrs={parentAttrs}>
      <select {...rest} className="w-full">
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </FormFieldBox>
  )
}
