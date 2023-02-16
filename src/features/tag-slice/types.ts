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

export interface TagCategoryObject {
  label: TagCategoryLabel
  value: TagCategoryValue
}

export type TagCategoryLabel = "Technology" | "Framework" | "Design Pattern" | "Approach" | "Library" | "Style" | "Code Fragments" | "Utilitary Library"
export type TagCategoryValue = "technology" | "framework" | "design_pattern" | "approach" | "library" | "style" | "code_fragments" | "utilitary_library"
