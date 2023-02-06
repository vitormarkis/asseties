import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Context } from "./types"

export const initialState: Context = {
  editing_id: null,
}

export const contextSlicer = createSlice({
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

export const { setEditingId, resetEditingId } = contextSlicer.actions

export const contextReducer = contextSlicer.reducer
