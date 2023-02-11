import { AssetType } from "@features/asset-slice/types"
import { TagType } from "@features/tag-slice/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ContextState } from "./types"

export const initialState: ContextState = {
  editing_asset_id: null,
  editing_tag_id: null,
  current_tag: null,
  current_asset: null,
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
    setCurrentTag: (state, action: PayloadAction<TagType>) => {
      state.current_tag = action.payload
    },
    resetCurrentTag: state => {
      state.current_tag = null
    },
    setCurrentAsset: (state, action: PayloadAction<AssetType>) => {
      state.current_asset = action.payload
    },
    resetCurrentAsset: state => {
      state.current_asset = null
    },
  },
})

export const {
  setEditingAssetId,
  resetEditingAssetId,
  resetEditingTagId,
  setEditingTagId,
  resetCurrentTag,
  setCurrentTag,
  resetCurrentAsset,
  setCurrentAsset,
} = contextSlice.actions

export const contextReducer = contextSlice.reducer
