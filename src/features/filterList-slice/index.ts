import { AssetType } from "@features/asset-slice/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContextState } from "./types";

export const initialState: ContextState = {
    filteredList: [],
    fields: {
        searchField: ''
    },
    sortState: false
}

export const filteredListSlice = createSlice({
    name: "filteredList",
    initialState,
    reducers: {
        setFilteredList: (state, action: PayloadAction<AssetType[] | undefined>) => {
            state.filteredList = action.payload ?? []
        },
        setFilteredListSearchField: (state, action: PayloadAction<string>) => {
            state.fields.searchField = action.payload 
        },
        setFilteredListSortState: (state, action: PayloadAction<boolean | undefined>) => {
            state.sortState = action.payload ?? !state.sortState
        }
    }
})

export const { setFilteredList, setFilteredListSearchField, setFilteredListSortState } = filteredListSlice.actions

export const filteredListReducer = filteredListSlice.reducer