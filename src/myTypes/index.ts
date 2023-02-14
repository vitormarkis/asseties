import { SortingAssetProps } from "@features/filterList-slice/types"

export interface IdentificationProps {
  id: string
  created_at: string
  updated_at: string
}

export interface SetKeyValue<K, V> {
  key: K
  value: V
}

export type mapTuple = [string, any]

export interface SortingAssetObjectProps {
  label: string
  value: SortingAssetProps
}
