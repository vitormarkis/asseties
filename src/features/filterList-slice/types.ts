import { AssetType } from "@features/asset-slice/types";

export interface ContextState {
    filteredList: AssetType[] | []
    sortState: boolean
    fields: {
        searchField: string
    }
}