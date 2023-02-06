export interface Fields {
    fruit_name: string
    note: string
  }

  export type KeyofFields = keyof Fields

  export interface SetProps {
    key: KeyofFields
    value: string
  }