import { Tag } from "@features/tags-slice/types"
import { IdentificationProps } from "@myTypes/index"

export interface Fields {
    fruit_name: string
    note: string
  }

  export type KeyofFields = keyof Fields

  export interface SetProps {
    key: KeyofFields
    value: string
  }

  export interface Fruit extends IdentificationProps, Fields {
    tags: Tag[]
  }