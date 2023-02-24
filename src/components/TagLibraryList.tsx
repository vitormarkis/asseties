import { AssetTypeColored } from "@features/asset-slice/types"
import { TagTypeColored } from "@features/tag-slice/types"
import { HTMLAttributes, useState } from "react"
import { FormFieldBox } from "./atoms"
import Title from "./atoms/Title"

interface Props extends HTMLAttributes<HTMLDivElement> {
  assets: AssetTypeColored[]
  seeingTagName: string
  setSeeingTagName: React.Dispatch<React.SetStateAction<string>>
}

interface UniqueTagsInterface {
  uniqueTags: TagTypeColored[]
}

const TagLibraryList: React.FC<Props> = ({ assets, seeingTagName, setSeeingTagName, ...rest }) => {
  const [searchInput, setSearchInput] = useState('');
  
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

  const filteredAssets = uniqueTags.filter(tag => {
    return tag.tag_name.toLowerCase().includes(searchInput.toLowerCase()) ?? tag
  })
  
  const finalAssets = filteredAssets.sort((a, b) =>
    a.category.toLowerCase() > b.category.toLowerCase()
      ? 1
      : a.category.toLowerCase() < b.category.toLowerCase()
      ? -1
      : 0
  )

  return (
    <div
      className="flex flex-col gap-1 text-xs"
      {...rest}
    >
      <div className="mb-4">
        <Title>Pesquise por tags:</Title>
        <FormFieldBox>
          <input
            autoComplete="off"
            onChange={e => setSearchInput(e.currentTarget.value)}
            value={searchInput}
            type="text"
            placeholder="framer motion"
            className="w-full"
          />
        </FormFieldBox>
      </div>
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
