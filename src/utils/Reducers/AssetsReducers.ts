import { AssetFormFields, AssetType } from "@features/asset-slice/types"
import { TagFormFields, TagType } from "@features/tag-slice/types"
import { TagCollorPallete } from "@myTypes/colorTypes"
import { generateId } from ".."

export const AssetObjectReducers = (asset?: AssetType) => ({
  asset,
  refresh: (): AssetType => ({ ...asset!, updated_at: String(new Date()) }),
  createAsset: (assetFormFields: AssetFormFields): AssetType => ({ ...generateId(), ...assetFormFields, tags: [] }),
  updateAsset: (assetFormFields: AssetFormFields): AssetType => ({ ...asset!, ...assetFormFields }),
  getTag: (tagId: string): TagType => asset!.tags.find(tag => tag.id === tagId)!,
  addTag: (newTag: TagType): AssetType => ({ ...asset!, tags: [...asset!.tags, newTag] }),
  updateTag: (newTag: TagType): AssetType => ({
    ...asset!,
    tags: asset!.tags.map(tag => (tag.id === newTag.id ? newTag : tag)),
  }),
  removeTag: (tagId: string): AssetType => ({ ...asset!, tags: asset!.tags.filter(tag => tag.id !== tagId) }),
  patchTag: (tagId: string, tagFormFields: TagFormFields): AssetType => ({
    ...asset!,
    tags: asset!.tags.map(tag => (tag.id === tagId ? { ...tag, ...tagFormFields } : tag)),
  }),
})

export const AssetsArrayReducers = (assets: AssetType[]) => ({
  assets,
  getAsset: (assetId: string) => assets.find(asset => asset.id === assetId),
  addAsset: (newAsset: AssetType) => [...assets, newAsset],
  updateAsset: (newAsset: AssetType) => assets.map(asset => (asset.id === newAsset.id ? newAsset : asset)),
  removeAsset: (assetId: string) => assets.filter(asset => asset.id !== assetId),
  colorize: (collorPallete: TagCollorPallete[]): AssetType[] =>
    assets.map(asset => ({
      ...asset,
      tags: asset.tags.map(tag => ({ ...tag, ...collorPallete.find(pallete => pallete.category === tag.category) })),
    })),
})
