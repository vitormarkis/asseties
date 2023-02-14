import { AssetType } from "@features/asset-slice/types";

export interface ContextState {
    filteredList: AssetType[] | []
    sortState: number
    fields: {
        searchField: string
    }
}