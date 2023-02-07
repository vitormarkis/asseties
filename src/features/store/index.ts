import { assetReducer } from "@features/asset-slice"
import { contextReducer } from "@features/context-slice"
import { tagReducer } from "@features/tag-slice"
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    asset: assetReducer,
    tag: tagReducer,
    context: contextReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
