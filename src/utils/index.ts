import { casingWhitelist } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { mapTuple } from "@myTypes/index"

export function eraseFields<T extends { [K: string]: string }>(fields: T): { [K: string]: "" } {
  const resetedValues = Object.entries(fields!).map(keyPair => [keyPair[0], ""])
  return Object.fromEntries(resetedValues)
}

export const generateId = () => ({
  id: Math.random().toString(36).substring(2, 18),
  created_at: String(new Date()),
  updated_at: String(new Date()),
})

export const FieldsReducers = <T extends object>(formFields: T) => ({
  formFields,
  formatFields: (formatterFn: (tuple: mapTuple) => mapTuple[]): T => {
    const entries = Object.entries(formFields)
    return Object.fromEntries(entries.map(formatterFn))
  },
})

export const Formatter = {
  fields: ([key, value]: mapTuple): mapTuple =>
    casingWhitelist.includes(key) ? [key, value] : [key, value.trim().replace(" ", "_").toLowerCase()],
}

export const sortMethod =
  <T extends AssetType>(sortState: number, filterCriteria: keyof T) =>
  (a: T, b: T): number => {
    const aValue =
      typeof a[filterCriteria] === "string" ? (a[filterCriteria] as string).toLowerCase() : a[filterCriteria]
    const bValue =
      typeof b[filterCriteria] === "string" ? (b[filterCriteria] as string).toLowerCase() : b[filterCriteria]
    return aValue > bValue ? (sortState === 2 ? -1 : 1) : sortState === 2 ? 1 : -1
  }

export const filterMethod = (searchField: string) => (asset: AssetType) =>
  asset.asset_name.toLowerCase().includes(searchField.toLowerCase())
