import { Tag } from "@features/tag-slice/types"
import { IdentificationProps } from "@myTypes/index"

/**
 * Global
 */

export interface AssetState {
  fields: AssetFormFields
}

export interface Asset extends IdentificationProps, AssetFormFields {
  tags: Tag[]
}

/**
 * Complementaries
 */

export interface AssetFormFields {
  asset_name: string
}

export type KeyofAssetFormFields = keyof AssetFormFields
