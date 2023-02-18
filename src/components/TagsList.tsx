import { AssetTypeColored } from "@features/asset-slice/types"
import { TagTypeColored } from "@features/tag-slice/types"
import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  assets: AssetTypeColored[]
  seeingTagName: string
  setSeeingTagName: React.Dispatch<React.SetStateAction<string>>
}

interface UniqueTagsInterface {
  uniqueTags: TagTypeColored[]
}

const TagLibraryList: React.FC<Props> = ({ assets, seeingTagName, setSeeingTagName, ...rest }) => {
  if (!assets) return <div>Loading...</div>

  const uniqueTagsInterface: UniqueTagsInterface = [...assets].reduce(
    (acc, asset) => {
      asset.tags.forEach(tag => {
        const allowed = acc.uniqueTags.find(uniTag => uniTag.tag_name === tag.tag_name)
        acc.uniqueTags = allowed ? acc.uniqueTags : [...acc.uniqueTags, tag]
      })
      return acc
    },
    { uniqueTags: [] } as UniqueTagsInterface
  )
  
  const { uniqueTags } = uniqueTagsInterface

  const finalAssets = uniqueTags.sort((a, b) =>
    a.tag_name.toLowerCase() > b.tag_name.toLowerCase()
      ? 1
      : a.tag_name.toLowerCase() < b.tag_name.toLowerCase()
      ? -1
      : 0
  )

  return (
    <div
      className="flex flex-col gap-1 text-xs"
      {...rest}
    >
      {seeingTagName}
      {finalAssets.map(tag => (
        <div
          key={tag.id}
          className="cursor-pointer py-1 px-1 text-white rounded-sm"
          onClick={() => setSeeingTagName(tag.tag_name)}
          style={{ backgroundColor: tag.color }}
        >
          {tag.tag_name}
        </div>
      ))}
    </div>
  )
}

export default TagLibraryList
