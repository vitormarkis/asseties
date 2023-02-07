import { IdentificationProps } from "@myTypes/index"

export interface TagFields {
  tag_name: string
  category: string
}

export type KeyofTagFields = keyof TagFields

export interface SetProps {
  key: KeyofTagFields
  value: string
}

export interface Tag extends IdentificationProps, TagFields {}
