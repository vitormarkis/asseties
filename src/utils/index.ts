import { Asset, AssetState } from "@features/asset-slice/types"
import { Tag, TagState } from "@features/tag-slice/types"
import { QueryClient } from "react-query"

export function getQueryData<T>(cacheKey: string, queryClient: QueryClient) {
  return queryClient.getQueryData<T>(cacheKey)
}

export function addNewFruitToCache(newFruit: Asset, queryClient: QueryClient) {
  const previousFruits = getQueryData<Asset[]>("fruits", queryClient)
  if (!previousFruits) return
  const newQueryData = [...previousFruits, newFruit]

  queryClient.setQueryData("fruits", newQueryData)
}

export function addNewTagInCache(fruitId: string, newTag: Tag, queryClient: QueryClient) {
  const fruits = getQueryData<Asset[]>("fruits", queryClient)
  if (!fruits) return
  const fruitsWithTagAdded = fruits.map((fruit) =>
    fruit.id === fruitId ? { ...fruit, tags: [...fruit.tags, newTag] } : { ...fruit }
  )

  // queryClient.invalidateQueries('fruits')
  queryClient.setQueryData("fruits", fruitsWithTagAdded)
}

export function removeFruitFromCache(fruidId: string, queryClient: QueryClient) {
  const previousFruits = getQueryData<Asset[]>("fruits", queryClient)
  if (!previousFruits) return
  const newQueryData = previousFruits.filter((fruit) => fruit.id !== fruidId)
  queryClient.setQueryData("fruits", newQueryData)
}

export function eraseFields(fields: any): any {
  const valuesChanged = Object.entries(fields).map((keyPair) => [keyPair[0], ""])
  return Object.fromEntries(valuesChanged)
}

export function updateFruitInCache(fruitId: string, queryClient: QueryClient, updatedFields: AssetState) {
  const previousFruits = getQueryData<Asset[]>("fruits", queryClient)!
  const updatedQueryData = previousFruits.map((fruit) =>
    fruit.id === fruitId ? { ...fruit, ...updatedFields } : { ...fruit }
  )
  queryClient.setQueryData("fruits", updatedQueryData)
}

export function checkDifference({ fruit_name, note }: AssetState, fields: AssetState) {
  return Object.entries({ fruit_name, note }).reduce((isDifferent, fruit) => {
    const [key, value]: [keyof AssetState, string] = fruit as [keyof AssetState, string]

    if (fields[key] !== value) {
      isDifferent = true
    }
    return isDifferent
  }, false)
}

export const generateId = () => {
  const id = Math.random().toString(36).substring(2, 9).toUpperCase()
  const created_at = String(new Date())
  return {
    id,
    created_at,
  }
}

export function generateNewFruit(fields: AssetState): Asset {
  const { created_at, id } = generateId()
  return { id, ...fields, created_at, tags: [] }
}
export function generateNewTag(tagFields: TagState): Tag {
  const { created_at, id } = generateId()
  const { category } = tagFields
  return { id, ...tagFields, created_at, category: category.toLocaleLowerCase() }
}

export function removeTag(fruitId: string, tagId: string, fruits: Asset[]) {
  const fruit = fruits.find((fruit) => fruit.id === fruitId)
  if (!fruit) return
  const tagsWithoutExcludedOne = fruit.tags.filter((tag) => tag.id !== tagId)
  const fruitWithoutTag = { ...fruit, tags: tagsWithoutExcludedOne }
  const updatedFruits = fruits.map((fruit) =>
    fruit.id === fruitId ? { ...fruit, tags: tagsWithoutExcludedOne } : { ...fruit }
  )
  return {
    fruits: updatedFruits,
    tags: tagsWithoutExcludedOne,
    fruit: fruitWithoutTag,
  }
}
