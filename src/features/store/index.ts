import { tagFieldsReducer } from "@features/tags-slice"
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import { contextReducer } from "../context-slice"
import { fieldsReducer } from "../fields-slice"

export const store = configureStore({
  reducer: {
    fields: fieldsReducer,
    context: contextReducer,
    tagFields: tagFieldsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
