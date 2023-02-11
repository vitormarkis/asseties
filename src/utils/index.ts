import { AssetFormFields, AssetType, KeyofAssetFormFields } from "@features/asset-slice/types"
import { TagFormFields, TagType } from "@features/tag-slice/types"
import { QueryClient } from "react-query"

export function getQueryData<T>(cacheKey: string, queryClient: QueryClient) {
  return queryClient.getQueryData<T>(cacheKey)
}

export function addNewAssetToCache(newAsset: AssetType, queryClient: QueryClient) {
  const previousAssets = getQueryData<AssetType[]>("assets", queryClient)
  if (!previousAssets) return
  const newQueryData = [...previousAssets, newAsset]

  queryClient.setQueryData("assets", newQueryData)
}

export function addNewTagInCache(assetId: string, newTag: TagType, queryClient: QueryClient) {
  const assets = getQueryData<AssetType[]>("assets", queryClient)
  if (!assets) return
  const assetsWithTagAdded = assets.map(asset =>
    asset.id === assetId ? { ...asset, tags: [...asset.tags, newTag] } : { ...asset }
  )

  queryClient.setQueryData("assets", assetsWithTagAdded)
}

export function removeAssetFromCache(assetId: string, queryClient: QueryClient) {
  const previousAssets = getQueryData<AssetType[]>("assets", queryClient)
  if (!previousAssets) return
  const assetsWithoutExcludedOne = previousAssets.filter(asset => asset.id !== assetId)
  queryClient.setQueryData("assets", assetsWithoutExcludedOne)
}

export function eraseFields<T>(fields: T): T {
  const resetedValues = Object.entries(fields!).map(keyPair => [keyPair[0], ""])
  return Object.fromEntries(resetedValues)
}

export function updateAssetInCache(queryClient: QueryClient, updatedAsset: AssetType) {
  const previousAssets = getQueryData<AssetType[]>("assets", queryClient)!
  const updatedAssets = previousAssets.map(asset =>
    asset.id === updatedAsset.id ? updatedAsset : { ...asset }
  )
  queryClient.setQueryData("assets", updatedAssets)
}

export function checkDifference({ asset_name }: AssetType, userAssetFields: AssetFormFields) {
  return Object.entries({ asset_name }).reduce((isDifferent, assetKeyPair) => {
    const [key, value] = assetKeyPair as [KeyofAssetFormFields, string]
    if (userAssetFields[key] !== value) {
      isDifferent = true
    }
    return isDifferent
  }, false)
}

export const generateId = () => {
  const id = Math.random().toString(36).substring(2, 18)
  const created_at = String(new Date())
  const updated_at = String(new Date())
  return {
    id,
    created_at,
    updated_at,
  }
}

export function generateNewAsset(assetValues: AssetFormFields): AssetType {
  const { created_at, id, updated_at } = generateId()
  return { id, ...assetValues, created_at, updated_at, tags: [] }
}
export function generateNewTag(tagFields: TagFormFields, updatedAt?: { updated_at: string }): TagType {
  const { created_at, id, updated_at } = generateId()
  const { category } = tagFields
  const lastUpdate = () => updatedAt ?? {}
  return { id, ...tagFields, created_at, updated_at, category: category.toLocaleLowerCase(), ...lastUpdate() }
}

export function removeTag(assetId: string, tagId: string, assets: AssetType[]) {
  const asset = assets.find(asset => asset.id === assetId)
  if (!asset) return
  const tagsWithoutExcludedOne = asset.tags.filter(tag => tag.id !== tagId)
  const assetWithoutTag = { ...asset, tags: tagsWithoutExcludedOne }
  const updatedAssets = assets.map(asset =>
    asset.id === assetId ? { ...asset, tags: tagsWithoutExcludedOne } : { ...asset }
  )
  return {
    assets: updatedAssets,
    tags: tagsWithoutExcludedOne,
    asset: assetWithoutTag,
  }
}

export function getUpdatedAssetByUpdatingTag(
  tagFormFields: TagFormFields,
  tagId: string,
  asset: AssetType
): AssetType {
  return {
    ...asset,
    updated_at: String(new Date()),
    tags: asset.tags.map(tag => (tag.id === tagId ? { ...tag, ...tagFormFields } : { ...tag })),
  }
}

export function getUpdatedAssetByNewTag(tagFields: TagFormFields, asset: AssetType): AssetType {
  const newTag = generateNewTag(tagFields)
  return {
    ...asset,
    updated_at: String(new Date()),
    tags: [...asset.tags, newTag],
  }
}

export function getUpdatedAsset(asset: AssetType, assetFormFields: AssetFormFields): AssetType {
  return {
    ...asset,
    updated_at: String(new Date()),
    ...assetFormFields,
  }
}

export function filterAssetByTag(asset: AssetType, exludingTag: TagType): AssetType {
  return {
    ...asset,
    tags: asset.tags.filter(tag => tag.id !== exludingTag.id),
  }
}

export function getUpdatedAssets(assets: AssetType[], upcomingAsset: AssetType): AssetType[] {
  return assets.map(asset => (asset.id === upcomingAsset.id ? { ...upcomingAsset } : { ...asset }))
}

export function formatFields<T extends object>(formTag: T): T {
  const entries = Object.entries(formTag)
  const formattedFields = entries.map(([key, value]) => {
    if(key === 'tag_name') return [key, value]
    if(key === 'asset_name') return [key, value]
    return [key, value.trim().replace(' ','_').toLowerCase()]
  })
  return Object.fromEntries(formattedFields)
}