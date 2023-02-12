import { AssetType } from "@features/asset-slice/types"

export const manipulateAssets = (assets: AssetType[]) => ({
  assets,

  addAsset(newAsset: AssetType) {
    assets = [...assets, newAsset]
    return this
  },

  updateAsset(updatedAsset: AssetType) {
    assets = assets.map(asset => (asset.id === updatedAsset.id ? updatedAsset : asset))
    return this
  },

  removeAsset(assetId: string) {
    assets = assets.filter(asset => asset.id !== assetId)
    return this
  },

  getValues() {
    return assets
  },
})
