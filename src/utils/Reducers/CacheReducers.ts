import { AssetType } from "@features/asset-slice/types"
import { QueryClient, QueryKey } from "@tanstack/react-query"
import { AssetsArrayReducers } from "./AssetsReducers"

export const CacheReducers = (queryClient: QueryClient, queryKey: QueryKey) => {
  const assets = queryClient.getQueryData<AssetType[]>(queryKey)!
  if (!assets) {
    const msg = "Não foi encontrado nenhum cache para sua sessão."
    alert(msg)
    throw new Error(msg)
  }

  return {
    assets: () => ({
      set: (newAssets: AssetType[]) => {
        if (!newAssets) throw new Error("Não existe assets em cache.")
        queryClient.setQueryData(queryKey, [...assets, newAssets])
      },
    }),
    asset: () => ({
      add: (newAsset: AssetType) => {
        if (!newAsset) throw new Error("Não existe esse asset em cache.")
        const updatedAssets = AssetsArrayReducers(assets).addAsset(newAsset)
        queryClient.setQueryData(queryKey, updatedAssets)
      },
      update: (newAsset: AssetType) => {
        if (!newAsset) throw new Error("Não existe esse asset em cache.")
        const updatedAsset = AssetsArrayReducers(assets).updateAsset(newAsset)
        queryClient.setQueryData(queryKey, updatedAsset)
      },
      remove: (assetId: string) => {
        const updatedAssets = AssetsArrayReducers(assets).removeAsset(assetId)
        queryClient.setQueryData(queryKey, updatedAssets)
      },
    }),
  }
}
