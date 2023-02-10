import { KeyofTagEditFields, TagEditFields } from "@features/tag-slice/types"
import { HTMLAttributes, InputHTMLAttributes } from "react"
import FormFieldBox from "./FormFieldBox"

import { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  parentAttrs?: HTMLAttributes<HTMLDivElement>
  field: KeyofTagEditFields
  register: UseFormRegister<TagEditFields>
}

export const Input: React.FC<Props> = ({parentAttrs, field, register, ...rest}) => {
  return (
    <FormFieldBox parentAttrs={parentAttrs}>
      <input
        {...register(field)}
        {...rest}
        type="text"
        className="w-full"
      />
    </FormFieldBox>
  )
}
