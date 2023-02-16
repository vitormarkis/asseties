import { AssetType, AssetTypeColored } from "@features/asset-slice/types"
import { useAppSelector } from "@features/store"
import { AssetListProps } from "@routes/assetList"
import { AnimatePresence } from "framer-motion"
import { DetailedAsset } from "./DetailedAsset"
import { MainWrapper } from "./Wrappers/MainWrapper"

interface Props extends AssetListProps {}

function AssetListDetailed({ assets, filteredAssets, searchedAssets }: Props) {
  const { fields, sortState } = useAppSelector(state => state.filteredList)

  return (
    <MainWrapper className="grow overflow-y-scroll flex-col sm:rounded-lg scroll-style">
      {fields.searchField.length > 0 ? (
        searchedAssets?.map((asset, index) => (
          <DetailedAsset
            key={asset.id}
            index={index}
            asset={asset}
            animation={false}
          />
        ))
      ) : sortState ? (
        filteredAssets?.map((asset, index) => (
          <DetailedAsset
            key={asset.id}
            index={index}
            asset={asset}
            animation={false}
          />
        ))
      ) : (
        <AnimatePresence>
          {assets?.map((asset, index) => (
            <DetailedAsset
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

export default AssetListDetailed
