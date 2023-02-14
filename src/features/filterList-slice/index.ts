import { AssetType } from "@features/asset-slice/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ContextState } from "./types"

export const initialState: ContextState = {
  filteredList: [],
  fields: {
    searchField: "",
  },
  sortState: 0,
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
    setFilteredListSortState: (state, action: PayloadAction<number | undefined>) => {
      const switchState = state.sortState !== 2 ? 1 + state.sortState : 0
      state.sortState = action.payload ?? switchState
    },
  },
})

export const { setFilteredList, setFilteredListSearchField, setFilteredListSortState } = filteredListSlice.actions

export const filteredListReducer = filteredListSlice.reducer
