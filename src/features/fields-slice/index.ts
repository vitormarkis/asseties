import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Fields, SetProps } from "./types"

export const initialState: Fields = {
  fruit_name: "",
  note: "",
}

export const fieldsSlicer = createSlice({
  name: "fields",
  initialState,
  reducers: {
    setOneField: (state, action: PayloadAction<SetProps>) => {
      const { key, value } = action.payload
      state[key] = value
    },
    setFields: (_, action: PayloadAction<Fields>) => {
      return action.payload
    },
  },
})

export const { setOneField, setFields } = fieldsSlicer.actions

export const fieldsReducer = fieldsSlicer.reducer
