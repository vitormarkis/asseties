import { AssetFormFields, AssetType, AssetTypeColored } from "@features/asset-slice/types"
import { TagFormFields, TagType, TagTypeColored } from "@features/tag-slice/types"
import { TagCollorPallete } from "@myTypes/colorTypes"
import { generateId } from ".."

export const AssetObjectReducers = (asset: AssetType | AssetTypeColored) => ({
  asset,
  refresh: (): AssetType | AssetTypeColored => ({ ...asset, updated_at: String(new Date()) }),
  createAsset: (assetFormFields: AssetFormFields): AssetType => ({
    ...generateId(),
    ...assetFormFields,
    tags: [],
  }),
  updateAsset: (assetFormFields: AssetFormFields): AssetType => ({
    ...asset,
    ...assetFormFields,
  }),
  getTag: (tagId: string): TagType => asset.tags.find(tag => tag.id === tagId)!,
  addTag: (newTag: TagType): AssetType => ({
    ...asset,
    tags: [...asset.tags, newTag],
  }),
  updateTag: (newTag: TagType | TagTypeColored): AssetType | AssetTypeColored => ({
    ...asset,
    tags: asset.tags.map(tag => (tag.id === newTag.id ? newTag : tag)),
  }),
  removeTag: (tagId: string): AssetType | AssetTypeColored => ({
    ...asset,
    tags: asset.tags.filter(tag => tag.id !== tagId),
  }),
  patchTag: (tagId: string, tagFormFields: TagFormFields): AssetType => ({
    ...asset,
    tags: asset.tags.map(tag => (tag.id === tagId ? { ...tag, ...tagFormFields } : tag)),
  }),
  colorize: (collorPallete: TagCollorPallete[]): AssetTypeColored => ({
    ...asset,
    tags: asset.tags.map(tag => ({
      ...tag,
      ...(collorPallete.find(pallete => pallete.category === tag.category) ?? { color: "#99cccc" }),
    })),
  }),
  dryTags: () => ({
    ...asset,
    tags: asset?.tags.map(tag => {
      const { color, ...rawTag } = tag as TagTypeColored
      return { ...rawTag }
    }),
  }),
})

export const AssetsArrayReducers = (assets: AssetType[]) => {
  return {
    assets,
    getAsset: (assetId: string) => assets.find(asset => asset.id === assetId),
    addAsset: (newAsset: AssetType) => [...assets, newAsset],
    updateAsset: (newAsset: AssetType) => assets.map(asset => (asset.id === newAsset.id ? newAsset : asset)),
    removeAsset: (assetId: string) => assets.filter(asset => asset.id !== assetId),
    colorize: (collorPallete: TagCollorPallete[]): AssetTypeColored[] =>
      assets?.map(asset => ({
        ...asset,
        tags: asset.tags.map(tag => ({
          ...tag,
          ...(collorPallete.find(pallete => pallete.category === tag.category) ?? { color: "#99cccc" }),
        })),
      })),
  }
}
