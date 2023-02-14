import { HTMLAttributes } from "react"
import FormFieldBox from "./FormFieldBox"

import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form"

interface Props<T extends FieldValues> extends HTMLAttributes<HTMLInputElement> {
  parentAttrs?: HTMLAttributes<HTMLDivElement>
  field: FieldPath<T>
  register: UseFormRegister<T>
  name?: string
}

function Input<T extends FieldValues>(props: Props<T>){
  const { parentAttrs, field, register, className,...rest } = props
  return (
    <FormFieldBox parentAttrs={parentAttrs}>
      <input
        autoComplete="off"
        {...register(field)}
        {...rest}
        type="text"
        className={className + " w-full"}
      />

    </FormFieldBox>
  )
}

export default Input
