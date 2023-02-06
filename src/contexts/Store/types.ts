export interface Fields {
  fruit_name: string
  note: string
}

export interface StateProps {
  editing_id: string | null
}

export interface RootStoreState {
  fields: Fields
  context: StateProps
}

export interface RootStoreReducer {
  state: RootStoreState
  dispatch: React.Dispatch<RootStoreState>
}
