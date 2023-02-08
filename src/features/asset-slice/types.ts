import { TagType } from "@features/tag-slice/types"
import { IdentificationProps } from "@myTypes/index"

/**
 * Global
 */

export interface AssetState {
  fields: AssetFormFields
}

export interface AssetType extends IdentificationProps, AssetFormFields {
  tags: TagType[]
}

/**
 * Complementaries
 */

export interface AssetFormFields {
  asset_name: string
}

export type KeyofAssetFormFields = keyof AssetFormFields
