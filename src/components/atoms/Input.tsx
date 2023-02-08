import { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}

export const Input: React.FC<Props> = (props) => {
    const {...rest} = props
    return (
        <input
          className="w-full py-1 px-3 rounded-sm shadow-sh"
          type="text"
          {...rest}
        />
    )
}