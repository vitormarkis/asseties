import { baseURL, tagCollorPallete } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { useQuery } from "@tanstack/react-query"
import { AssetsArrayReducers } from "@utils/Reducers/AssetsReducers"
import axios from "axios"
import { CompactAsset } from "./CompactAsset"
import { MainWrapper } from "./Wrappers/MainWrapper"

const ListAsset: React.FC = () => {
  const { data: assets, isLoading } = useQuery<AssetType[]>(
    ["assets"],
    async () => {
      const res = await axios.get(baseURL)
      return res.data
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  )

  if (isLoading || !assets) {
    return <h1>Carregando...</h1>
  }

  const coloredAssets = AssetsArrayReducers(assets).colorize(tagCollorPallete)

  return (
    <MainWrapper className="flex flex-col">
      {coloredAssets.map((asset, index) => (
        <CompactAsset
          key={asset.id}
          index={index}
          asset={asset}
        />
      ))}
    </MainWrapper>
  )
}

export default ListAsset
