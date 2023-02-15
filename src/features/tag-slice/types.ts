import { ColorType, IdentificationProps } from "@myTypes/index"

/**
 * Global
 */

export interface TagState {
  formFields: TagFormFields
  editFields: TagEditFields
}

export interface TagType extends IdentificationProps, TagFormFields {}

/**
 * Complementaries
 */

export interface TagFormFields {
  tag_name: string
  category: string
}

export interface TagEditFields extends TagFormFields {}

export type KeyofTagFormFields = keyof TagFormFields
export type KeyofTagEditFields = keyof TagEditFields

export interface TagTypeColored extends TagType {
  color: ColorType
}
