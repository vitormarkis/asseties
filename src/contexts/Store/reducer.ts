import { RootStoreState } from "./types"

export const initialState: RootStoreState = {
    fields: {
        fruit_name: '',
        note: '',
    },
    context: {
        editing_id: null,
    }
}

export function reducer(state: RootStoreState, newState: Partial<RootStoreState>) {
    return {
        ...state,
        ...newState
    }
}