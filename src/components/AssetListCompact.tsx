import { AssetType } from "@features/asset-slice/types"
import { useAppSelector } from "@features/store"
import { sortMethod } from "@utils/index"
import { AnimatePresence } from "framer-motion"
import { CompactAsset } from "./CompactAsset"
import { MainWrapper } from "./Wrappers/MainWrapper"

interface Props {
  assets: AssetType[]
  searchedAssets: AssetType[]
  filteredAssets: AssetType[]
}

function AssetListCompact({ assets, filteredAssets, searchedAssets }: Props) {
  const { fields, sortState } = useAppSelector(state => state.filteredList)

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
