import { HTMLAttributes } from "react"
import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form"
import FormFieldBox from "./FormFieldBox"

interface Props<T extends FieldValues> extends HTMLAttributes<HTMLSelectElement> {
  parentAttrs?: HTMLAttributes<HTMLDivElement>
  options: string[]
  register: UseFormRegister<T>
  field: FieldPath<T>
}

function Select<T extends FieldValues>(props: Props<T>) {
  const { parentAttrs, options, field, register, ...rest } = props
  return (
    <FormFieldBox parentAttrs={parentAttrs}>
      <select
        {...register(field)}
        {...rest}
        value="Design System"
        defaultValue='Design System'
        className="w-full"
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </FormFieldBox>
  )
}

export default Select
