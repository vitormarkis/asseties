import { AssetFormFields, AssetType } from "@features/asset-slice/types"
import { TagFormFields, TagType } from "@features/tag-slice/types"
import { generateId } from ".."

export const AssetObjectReducers = (asset?: AssetType) => ({
  asset,
  createAsset: (assetFormFields: AssetFormFields): AssetType => ({ ...generateId(), ...assetFormFields, tags: [] }),
  updateAsset: (assetFormFields: AssetFormFields) => ({ ...asset, ...assetFormFields }),
  refresh: () => ({ ...asset, updated_at: String(new Date()) }),
  getTag: (tagId: string) => asset!.tags.find(tag => tag.id === tagId),
  addTag: (newTag: TagType) => ({ ...asset, tags: [...asset!.tags, newTag] }),
  updateTag: (newTag: TagType) => ({ ...asset, tags: asset!.tags.map(tag => (tag.id === newTag.id ? newTag : tag)) }),
  removeTag: (tagId: string) => ({ ...asset, tags: asset!.tags.filter(tag => tag.id !== tagId) }),
  patchTag: (tagId: string, tagFormFields: TagFormFields) => ({
    ...asset,
    tags: asset!.tags.map(tag => (tag.id === tagId ? { ...tag, ...tagFormFields } : tag)),
  }),
})

export const AssetsArrayReducers = (assets: AssetType[]) => ({
  assets,
  getAsset: (assetId: string) => assets.find(asset => asset.id === assetId),
  addAsset: (newAsset: AssetType) => [...assets, newAsset],
  updateAsset: (newAsset: AssetType) => assets.map(asset => (asset.id === newAsset.id ? newAsset : asset)),
  removeAsset: (assetId: string) => assets.filter(asset => asset.id !== assetId),
})
