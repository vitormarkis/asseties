import { TagType, TagTypeColored } from "@features/tag-slice/types"
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

export interface AssetTypeColored extends Omit<AssetType, "tags"> {
  tags: TagTypeColored[]
}

/**
 * Complementaries
 */

export interface AssetFormFields {
  asset_name: string
}

export type KeyofAssetFormFields = keyof AssetFormFields
