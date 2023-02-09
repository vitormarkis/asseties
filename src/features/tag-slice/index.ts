import { SetKeyValue } from "@myTypes/index"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { KeyofTagEditFields, KeyofTagFormFields, TagEditFields, TagFormFields, TagState } from "./types"

export const initialState: TagState = {
  formFields: {
    tag_name: "",
    category: "",
  },
  editFields: {
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
      state.formFields[key] = value
    },
    setTagFormFields: (state, action: PayloadAction<TagFormFields>) => {
      state.formFields = action.payload
    },
    setOneTagEditField: (state, action: PayloadAction<SetKeyValue<KeyofTagEditFields, string>>) => {
      const { key, value } = action.payload
      state.editFields[key] = value
    },
    setTagEditFields: (state, action: PayloadAction<TagEditFields>) => {
      state.editFields = action.payload
    },
  },
})

export const { setOneTagFormField, setTagFormFields, setOneTagEditField, setTagEditFields } = tagSlice.actions

export const tagReducer = tagSlice.reducer
