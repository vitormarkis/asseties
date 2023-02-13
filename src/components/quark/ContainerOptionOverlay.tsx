import { AssetListContainerType } from "@features/context-slice/types"
import { useAppSelector } from "@features/store"
import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const ContainerOptionOverlay: React.FC<Props> = ({ title, className, ...rest }) => {
  const { current_asset_list_container:current } = useAppSelector(state => state.context)

  const currentStyle: Record<AssetListContainerType, Pick<HTMLAttributes<HTMLDivElement>, 'style'>> = {
    details: { style: {} },
    compact: {
      style: {
        transform: 'translateX(100%)',
        borderRight: 'none'
      }
    }
  }
  
  return (
    <div
    className={`${className} w-1/2 absolute inset-0 z-0 transition-all duration-500`}
      {...rest}
      style={currentStyle[current].style}
    >
      <p>{title}</p>
    </div>
  )
}
