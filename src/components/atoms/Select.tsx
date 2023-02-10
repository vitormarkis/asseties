import { KeyofTagEditFields, TagEditFields } from "@features/tag-slice/types"
import { HTMLAttributes, InputHTMLAttributes } from "react"
import { UseFormRegister } from "react-hook-form"
import FormFieldBox from "./FormFieldBox"

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  parentAttrs?: HTMLAttributes<HTMLDivElement>
  options: any[]
  field: KeyofTagEditFields
  register: UseFormRegister<TagEditFields>
  // register: <T>(value: T) => UseFormRegisterReturn<T>
}

export const Select: React.FC<Props> = ({ parentAttrs, options, field, register, ...rest }) => {
  return (
    <FormFieldBox parentAttrs={parentAttrs}>
      <select
        {...register(field)}
        {...rest}
        className="w-full"
      >
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </FormFieldBox>
  )
}
