import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ContextState, SortingAssetProps } from "./types"

export const initialState: ContextState = {
  fields: {
    searchField: "",
  },
  sortState: 0,
  sortingBy: "asset_name",
}

export const filteredListSlice = createSlice({
  name: "filteredList",
  initialState,
  reducers: {
    setFilteredListSearchField: (state, action: PayloadAction<string>) => {
      state.fields.searchField = action.payload
    },
    setFilteredListSortState: (state, action: PayloadAction<number | undefined>) => {
      const switchState = state.sortState !== 2 ? 1 + state.sortState : 0
      state.sortState = action.payload ?? switchState
    },
    setFilteredListSortingBy: (state, action: PayloadAction<SortingAssetProps>) => {
      state.sortingBy = action.payload
    },
  },
})

export const { setFilteredListSearchField, setFilteredListSortState, setFilteredListSortingBy } =
  filteredListSlice.actions

export const filteredListReducer = filteredListSlice.reducer
