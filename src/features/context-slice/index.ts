import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ContextState } from "./types"

export const initialState: ContextState = {
  editing_id: null,
}

export const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    setEditingId: (state, action: PayloadAction<string>) => {
      state.editing_id = action.payload
    },
    resetEditingId: (state) => {
      state.editing_id = null
    },
  },
})

export const { setEditingId, resetEditingId } = contextSlice.actions

export const contextReducer = contextSlice.reducer
