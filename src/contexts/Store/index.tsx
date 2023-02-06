import React, { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { RootStoreReducer } from "./types";

export const StoreContext = createContext<RootStoreReducer | null>(null)

export function StoreProvider({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    return <StoreContext.Provider value={{state, dispatch}}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)!