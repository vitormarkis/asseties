import { QueryClient } from "react-query"
import { Fruit } from "../routes/fruitsList"
import { Fields } from "@features/fields-slice/types"

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

export function generateNewFruit(fields: Fields): Fruit {
  const id = Math.random().toString(36).substring(2, 9).toUpperCase()
  const created_at = String(new Date())
  return { id, ...fields, created_at }
}
