import { Fields, Fruit } from "@features/fields-slice/types"
import { Tag, TagFields } from "@features/tags-slice/types"
import { QueryClient } from "react-query"

export function getQueryData<T>(cacheKey: string, queryClient: QueryClient) {
  return queryClient.getQueryData<T>(cacheKey)
}

export function addNewFruitToCache(newFruit: Fruit, queryClient: QueryClient) {
  const previousFruits = getQueryData<Fruit[]>("fruits", queryClient)
  if (!previousFruits) return
  const newQueryData = [...previousFruits, newFruit]

  queryClient.setQueryData("fruits", newQueryData)
}

export function addNewTagInCache(fruitId: string, newTag: Tag, queryClient: QueryClient) {
  const fruits = getQueryData<Fruit[]>("fruits", queryClient)
  if (!fruits) return
  const fruitsWithTagAdded = fruits.map((fruit) =>
    fruit.id === fruitId ? { ...fruit, tags: [...fruit.tags, newTag] } : { ...fruit }
  )

  // queryClient.invalidateQueries('fruits')
  queryClient.setQueryData("fruits", fruitsWithTagAdded)
}

export function removeFruitFromCache(fruidId: string, queryClient: QueryClient) {
  const previousFruits = getQueryData<Fruit[]>("fruits", queryClient)
  if (!previousFruits) return
  const newQueryData = previousFruits.filter((fruit) => fruit.id !== fruidId)
  queryClient.setQueryData("fruits", newQueryData)
}

export function eraseFields(fields: any): any {
  const valuesChanged = Object.entries(fields).map((keyPair) => [keyPair[0], ""])
  return Object.fromEntries(valuesChanged)
}

export function updateFruitInCache(fruitId: string, queryClient: QueryClient, updatedFields: Fields) {
  const previousFruits = getQueryData<Fruit[]>("fruits", queryClient)!
  const updatedQueryData = previousFruits.map((fruit) =>
    fruit.id === fruitId ? { ...fruit, ...updatedFields } : { ...fruit }
  )
  queryClient.setQueryData("fruits", updatedQueryData)
}

export function checkDifference({ fruit_name, note }: Fields, fields: Fields) {
  return Object.entries({ fruit_name, note }).reduce((isDifferent, fruit) => {
    const [key, value]: [keyof Fields, string] = fruit as [keyof Fields, string]

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

export function generateNewFruit(fields: Fields): Fruit {
  const { created_at, id } = generateId()
  return { id, ...fields, created_at, tags: [] }
}
export function generateNewTag(tagFields: TagFields): Tag {
  const { created_at, id } = generateId()
  const { category } = tagFields
  return { id, ...tagFields, created_at, category: category.toLocaleLowerCase() }
}
