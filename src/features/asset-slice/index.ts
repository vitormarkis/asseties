import { SetKeyValue } from "@myTypes/index"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AssetFormFields, AssetState, KeyofAssetFormFields } from "./types"

export const initialState: AssetState = {
  fields: {
    asset_name: "",
  },
}

export const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setOneAssetFormField: (state, action: PayloadAction<SetKeyValue<KeyofAssetFormFields, string>>) => {
      const { key, value } = action.payload
      state.fields[key] = value
    },
    setAssetFormFields: (state, action: PayloadAction<AssetFormFields>) => {
      state.fields = action.payload
    },
  },
})

export const { setOneAssetFormField, setAssetFormFields } = assetSlice.actions

export const assetReducer = assetSlice.reducer
