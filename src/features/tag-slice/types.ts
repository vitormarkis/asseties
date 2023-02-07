import { IdentificationProps } from "@myTypes/index"

/**
 * Global
 */

export interface TagState {
  fields: TagFormFields
}

export interface Tag extends IdentificationProps, TagFormFields {}

/**
 * Complementaries
 */

export interface TagFormFields {
  tag_name: string
  category: string
}

export type KeyofTagFormFields = keyof TagFormFields

