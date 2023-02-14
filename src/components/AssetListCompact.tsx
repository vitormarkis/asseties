import { AssetType } from "@features/asset-slice/types"
import { useAppSelector } from "@features/store"
import { AnimatePresence } from "framer-motion"
import { CompactAsset } from "./CompactAsset"
import { DetailedAsset } from "./DetailedAsset"
import { MainWrapper } from "./Wrappers/MainWrapper"

interface Props {
  assets: AssetType[]
}

function AssetListCompact({ assets }: Props) {
  const { filteredList, fields, sortState } = useAppSelector(state => state.filteredList)

  const searchedAssets = [...assets!]
    .sort((a, b) =>
      a.updated_at > b.updated_at ? (sortState ? 1 : -1) : a.updated_at < b.updated_at ? (sortState ? -1 : 1) : 0
    )
    .filter(asset => asset.asset_name.toLowerCase().includes(fields.searchField.toLowerCase()))!

  const filteredAssets = [...assets!].sort((a, b) =>
    a.asset_name > b.asset_name ? (sortState ? 1 : -1) : a.asset_name < b.asset_name ? (sortState ? -1 : 1) : 0
  )

  return (
    <MainWrapper className="grow overflow-y-scroll flex-col sm:rounded-lg scroll-style">
      {fields.searchField.length > 0 ? (
        searchedAssets?.map((asset, index) => (
          <CompactAsset
            key={asset.id}
            index={index}
            asset={asset}
            animation={false}
          />
        ))
      ) : sortState ? (
        filteredAssets?.map((asset, index) => (
          <CompactAsset
            key={asset.id}
            index={index}
            asset={asset}
            animation={false}
          />
        ))
      ) : (
        <AnimatePresence>
          {assets?.map((asset, index) => (
            <CompactAsset
              key={asset.id}
              index={index}
              asset={asset}
            />
          ))}
        </AnimatePresence>
      )}
    </MainWrapper>
  )
}

export default AssetListCompact
