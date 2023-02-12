import { AssetType } from "@features/asset-slice/types"
import { QueryClient } from "react-query"
import { AssetsArrayReducers } from "./AssetsReducers"

export const CacheReducers = (queryClient: QueryClient, queryKey: string) => {
  const assets = queryClient.getQueryData<AssetType[]>(queryKey)!

  return {
    assets: () => ({
      set: (newAssets: AssetType[]) => {
        queryClient.setQueryData(queryKey, [...assets, newAssets])
      },
    }),
    asset: () => ({
      add: (newAsset: AssetType) => {
        const updatedAssets = AssetsArrayReducers(assets).addAsset(newAsset)
        queryClient.setQueryData(queryKey, updatedAssets)
      },
      update: (newAsset: AssetType) => {
        const updatedAssets = AssetsArrayReducers(assets).updateAsset(newAsset)
        queryClient.setQueryData(queryKey, updatedAssets)
      },
      remove: (assetId: string) => {
        const updatedAssets = AssetsArrayReducers(assets).removeAsset(assetId)
        queryClient.setQueryData(queryKey, updatedAssets)
      },
    }),
  }
}
