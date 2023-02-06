import { QueryClient } from "react-query"
import { Fields } from "./Form"
import { Fruit } from "./Fruits"

export function getQueryData<T>(cacheKey: string, queryClient: QueryClient) {
  return queryClient.getQueryData<T>(cacheKey)
}

export function addNewFruitToCache(newFruit: Fruit, queryClient: QueryClient) {
  const previousFruits = getQueryData<Fruit[]>("fruits", queryClient)
  if (!previousFruits) return
  const newQueryData = [...previousFruits, newFruit]

  queryClient.setQueryData("fruits", newQueryData)
}

export function removeFruitFromCache(fruidId: string, queryClient: QueryClient) {
  const previousFruits = getQueryData<Fruit[]>("fruits", queryClient)
  if (!previousFruits) return
  const newQueryData = previousFruits.filter((fruit) => fruit.id !== fruidId)
  queryClient.setQueryData("fruits", newQueryData)
}

export function eraseFields(fields: Fields): Fields {
    const entries = Object.entries(fields)
    const valuesChanged = entries.map(keyPair => [keyPair[0], ''])
    return Object.fromEntries(valuesChanged)
}