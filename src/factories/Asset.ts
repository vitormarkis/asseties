import { AssetType } from "@features/asset-slice/types"
import { TagType } from "@features/tag-slice/types"

export const manipulateAsset = (asset: AssetType) => ({
  asset,

  refresh() {
    asset = { ...asset, updated_at: String(new Date()) }
    return this
  },

  addTag(newTag: TagType) {
    asset = { ...asset, tags: [...asset.tags, newTag] }
    this.refresh()
    return this
  },

  removeTag(tagId: string) {
    asset = { ...asset, tags: asset.tags.filter(tag => tag.id !== tagId) }
    this.refresh()
    return this
  },

  getValue() {
    return asset
  },
})
