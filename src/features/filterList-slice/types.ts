import { AssetType } from "@features/asset-slice/types"

export interface ContextState {
  sortState: number
  sortingBy: SortingAssetProps
  fields: {
    searchField: string
  }
}

export type SortingAssetProps = Exclude<keyof AssetType, "id" | "tags">
