import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SetProps, TagFields } from "./types"

export const initialState: TagFields = {
  tag_name: "",
  category: "",
}

export const tagFieldsSlicer = createSlice({
  name: "tagFields",
  initialState,
  reducers: {
    setOneTagField: (state, action: PayloadAction<SetProps>) => {
      const { key, value } = action.payload
      state[key] = value
    },
    setTagFields: (_, action: PayloadAction<TagFields>) => {
      return action.payload
    },
  },
})

export const { setOneTagField, setTagFields } = tagFieldsSlicer.actions

export const tagFieldsReducer = tagFieldsSlicer.reducer
