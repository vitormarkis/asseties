import { ButtonHTMLAttributes } from "react"
import clsx from 'clsx'

type BackgroundColors = 'blue' | 'red' | 'green'
type RoundedSizes = 'md' | 'full'
type TextColor = 'black' | 'white'
type FontSize = 'small' | 'normal' | 'extra-small'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  bg: BackgroundColors
  rounded: RoundedSizes
  color: TextColor
  fontSize?: FontSize
}

const Button: React.FC<Props> = (props) => {
  const { value, bg, rounded, color, ...rest } = props
  return (
    <button
      className={clsx(`py-1 px-5 font-base text-sm font-thin tracking-wider
      `, {
        'bg-blue-600': props.bg == 'blue',
        'bg-red-500': props.bg == 'red',
        'bg-emerald-600': props.bg == 'green',
        'rounded-md': props.rounded == 'md',
        'rounded-xl': props.rounded == 'full',
        'text-black': props.color == 'black',
        'text-white': props.color == 'white',
        'text-base': props.fontSize == 'normal',
        'text-sm': props.fontSize == 'small',
        'text-xs': props.fontSize == 'extra-small',
      })}
      {...rest}>
      {value}
    </button>
  )
}

export default Button
