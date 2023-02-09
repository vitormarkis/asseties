import { HTMLAttributes, InputHTMLAttributes } from "react"
import FormFieldBox from "./FormFieldBox"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  parentAttrs?: HTMLAttributes<HTMLDivElement>
}

export const Input: React.FC<Props> = ({parentAttrs, ...rest}) => {
  return (
    <FormFieldBox parentAttrs={parentAttrs}>
      <input
        type="text"
        className="w-full"
        {...rest}
      />
    </FormFieldBox>
  )
}
