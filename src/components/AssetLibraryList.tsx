import { AssetTypeColored } from "@features/asset-slice/types"
import { HTMLAttributes } from "react"
import { DetailedAsset } from "./DetailedAsset"

interface Props extends HTMLAttributes<HTMLDivElement> {
  assets: AssetTypeColored[]
  seeingTagName: string
  setSeeingTagName: React.Dispatch<React.SetStateAction<string>>
}

const AssetLibraryList: React.FC<Props> = ({ assets, seeingTagName, setSeeingTagName, ...rest }) => {
  const finalAssets = [...assets].filter(asset => asset.tags.find(tag => tag.tag_name === seeingTagName))

  return (
    <div {...rest}>
      {finalAssets.map(asset => (
        <DetailedAsset index={0} asset={asset} key={asset.id} />
      ))}
    </div>
  )
}

export default AssetLibraryList
