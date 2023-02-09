import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { TagType } from "@features/tag-slice/types"
import { NamedColor } from "@myTypes/colorTypes"
import { queryClient } from "@services/queryClient"
import { removeTag } from "@utils/index"
import axios from "axios"
import { HTMLAttributes } from "react"

import PopoverButton from "@components/quark/PopoverButton"
import * as Popover from "@radix-ui/react-popover"

interface Props extends HTMLAttributes<HTMLDivElement> {
  bg?: `#${string}` | NamedColor
  color?: `#${string}` | NamedColor
  tag: TagType
  assetId: string
  container: Element | null
}

const Tag: React.FC<Props> = props => {
  const { bg, color, tag, assetId, container, ...rest } = props

  function handleDeleteTag(assetId: string, tag: TagType) {
    const { id: tagId } = tag
    const assetsInCache = queryClient.getQueryData<AssetType[]>("assets")!
    const { assets, asset } = removeTag(assetId, tagId, assetsInCache)!
    queryClient.setQueryData("assets", assets)
    axios.put(`${baseURL}/${assetId}`, asset)
  }

  // console.log(container)

  return (
    <Popover.Root>
      <Popover.Trigger>
        <div
          className="leading-none p-1 rounded-sm text-xs flex gap-2 items-center"
          style={{
            backgroundColor: bg ?? "#52525B",
            color: color ?? "#fff",
          }}
          {...rest}
        >
          <p>{tag.tag_name}</p>
          <p
            onClick={() => handleDeleteTag(assetId, tag)}
            className="cursor-pointer p-1 rounded-full bg-black/20 mr-1 w-2.5 h-2.5"
          />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          onPointerDownOutside={e => console.log(e, "Joker!")}
          side="right"
          align="center"
          sticky="always"
          collisionBoundary={container}
          collisionPadding={{ left: 16 }}
          hideWhenDetached={true}
          className="plate py-2 rounded-md bg-slate-800 shadow-md shadow-black/20 flex flex-col text-xs"
          // style={{
          //   backgroundColor: bg ?? "#52525B",
          //   color: color ?? "#fff",
          // }}
        >
          <PopoverButton
            title="Excluir"
            event={() => handleDeleteTag(assetId, tag)}
          />
          <PopoverButton
            title="Renomear"
            event={() => {}}
          />
          <PopoverButton
            title="Trocar categoria"
            event={() => {}}
          />
          <Popover.Arrow
          fill="#1E293B"
            width={4}
            height={4}
          />
          {/* <Popover.Close>XIS</Popover.Close> */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default Tag
