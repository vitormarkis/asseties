import { SetKeyValue } from "@myTypes/index"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { KeyofTagFormFields, TagFormFields, TagState } from "./types"

export const initialState: TagState = {
  fields: {
    tag_name: "",
    category: "",
  },
}

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setOneTagFormField: (state, action: PayloadAction<SetKeyValue<KeyofTagFormFields, string>>) => {
      const { key, value } = action.payload
      state.fields[key] = value
    },
    setTagFormFields: (state, action: PayloadAction<TagFormFields>) => {
      state.fields = action.payload
    },
  },
})

export const { setOneTagFormField, setTagFormFields } = tagSlice.actions

export const tagReducer = tagSlice.reducer
