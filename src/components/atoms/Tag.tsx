import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { TagType } from "@features/tag-slice/types"
import { NamedColor } from "@myTypes/colorTypes"
import { queryClient } from "@services/queryClient"
import { removeTag } from "@utils/index"
import axios from "axios"
import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  bg?: `#${string}` | NamedColor
  color?: `#${string}` | NamedColor
  tag: TagType
  assetId: string
}

const Tag: React.FC<Props> = (props) => {
  const { bg, color, tag, assetId, ...rest } = props

  function handleDeleteTag(assetId: string, tag: TagType) {
    const { id: tagId } = tag
    const assetsInCache = queryClient.getQueryData<AssetType[]>("assets")!
    const { assets, asset } = removeTag(assetId, tagId, assetsInCache)!
    queryClient.setQueryData("assets", assets)
    axios.put(`${baseURL}/${assetId}`, asset)
  }

  return (
    <div
      className="leading-none p-1 rounded-sm text-xs flex gap-2 items-center"
      style={{
        backgroundColor: bg ?? "#52525B",
        color: color ?? '#fff'
      }}
      {...rest}>
      <p>{tag.tag_name}</p>
      <p
        onClick={() => handleDeleteTag(assetId, tag)}
        className="cursor-pointer p-1 rounded-full bg-black/20 mr-1 w-2.5 h-2.5"
      />
    </div>
  )
}

export default Tag
