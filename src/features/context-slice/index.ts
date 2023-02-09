import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ContextState } from "./types"

export const initialState: ContextState = {
  editing_asset_id: null,
  editing_tag_id: null,
}

export const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    setEditingAssetId: (state, action: PayloadAction<string>) => {
      state.editing_asset_id = action.payload
    },
    resetEditingAssetId: state => {
      state.editing_asset_id = null
    },
    setEditingTagId: (state, action: PayloadAction<string>) => {
      state.editing_tag_id = action.payload
    },
    resetEditingTagId: state => {
      state.editing_tag_id = null
    },
  },
})

export const { setEditingAssetId, resetEditingAssetId, resetEditingTagId, setEditingTagId } =
  contextSlice.actions

export const contextReducer = contextSlice.reducer
