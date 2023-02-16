import { setContextAssetListContainer as setListContainer } from "@features/context-slice"
import { AssetListContainerType } from "@features/context-slice/types"
import { useAppSelector } from "@features/store"
import clsx from "clsx"
import { HTMLAttributes } from "react"
import { useDispatch } from "react-redux"

interface Props extends HTMLAttributes<HTMLButtonElement> {
  // children: React.ReactNode
  title: string
  data_id: AssetListContainerType
}

export const ContainerOption: React.FC<Props> = ({ title, className, data_id, ...rest }) => {
  const { current_asset_list_container: current } = useAppSelector(state => state.context)
  const dispatch = useDispatch()

  return (
    <button
      onClick={() => dispatch(setListContainer(data_id))}
      className={clsx(
        `
      ${className ?? ''}
      w-1/2 px-2 flex font-light items-center justify-center z-10
      transition-all
      ${current === data_id ? "duration-300" : "delay-100"}
      `,
        {
          "text-white": current === data_id,
        }
      )}
      {...rest}
    >
      <p className="text-center">{title}</p>
    </button>
  )
}
