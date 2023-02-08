import { Asset, AssetFormFields, KeyofAssetFormFields } from "@features/asset-slice/types"
import { Tag, TagFormFields } from "@features/tag-slice/types"
import { QueryClient } from "react-query"

export function getQueryData<T>(cacheKey: string, queryClient: QueryClient) {
  return queryClient.getQueryData<T>(cacheKey)
}

export function addNewAssetToCache(newAsset: Asset, queryClient: QueryClient) {
  const previousAssets = getQueryData<Asset[]>("assets", queryClient)
  if (!previousAssets) return
  const newQueryData = [...previousAssets, newAsset]

  queryClient.setQueryData("assets", newQueryData)
}

export function addNewTagInCache(assetId: string, newTag: Tag, queryClient: QueryClient) {
  const assets = getQueryData<Asset[]>("assets", queryClient)
  if (!assets) return
  const assetsWithTagAdded = assets.map((asset) =>
    asset.id === assetId ? { ...asset, tags: [...asset.tags, newTag] } : { ...asset }
  )

  // queryClient.invalidateQueries('fruits')
  queryClient.setQueryData("assets", assetsWithTagAdded)
}

export function removeAssetFromCache(assetId: string, queryClient: QueryClient) {
  const previousAssets = getQueryData<Asset[]>("assets", queryClient)
  if (!previousAssets) return
  const assetsWithoutExcludedOne = previousAssets.filter((asset) => asset.id !== assetId)
  queryClient.setQueryData("assets", assetsWithoutExcludedOne)
}

export function eraseFields<T>(fields: T): T {
  const resetedValues = Object.entries(fields!).map((keyPair) => [keyPair[0], ""])
  return Object.fromEntries(resetedValues)
}

export function updateAssetInCache(
  assetId: string,
  queryClient: QueryClient,
  updatedFields: AssetFormFields
) {
  const previousAssets = getQueryData<Asset[]>("assets", queryClient)!
  const assetsWithUpdatedOne = previousAssets.map((asset) =>
    asset.id === assetId ? { ...asset, ...updatedFields } : { ...asset }
  )
  queryClient.setQueryData("assets", assetsWithUpdatedOne)
}

export function checkDifference({ asset_name }: Asset, userAssetFields: AssetFormFields) {
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

export function generateNewAsset(assetValues: AssetFormFields): Asset {
  const { created_at, id, updated_at } = generateId()
  return { id, ...assetValues, created_at, updated_at, tags: [] }
}
export function generateNewTag(tagFields: TagFormFields): Tag {
  const { created_at, id, updated_at } = generateId()
  const { category } = tagFields
  return { id, ...tagFields, created_at, updated_at, category: category.toLocaleLowerCase() }
}

export function removeTag(assetId: string, tagId: string, assets: Asset[]) {
  const asset = assets.find((asset) => asset.id === assetId)
  if (!asset) return
  const tagsWithoutExcludedOne = asset.tags.filter((tag) => tag.id !== tagId)
  const assetWithoutTag = { ...asset, tags: tagsWithoutExcludedOne }
  const updatedAssets = assets.map((asset) =>
    asset.id === assetId ? { ...asset, tags: tagsWithoutExcludedOne } : { ...asset }
  )
  return {
    assets: updatedAssets,
    tags: tagsWithoutExcludedOne,
    asset: assetWithoutTag,
  }
}
