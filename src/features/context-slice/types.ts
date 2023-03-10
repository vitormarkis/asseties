import { AssetType } from "@features/asset-slice/types"
import { TagType } from "@features/tag-slice/types"

export type AssetListContainerType = 'details' | 'compact'

export interface ContextState {
  editing_asset_id: string | null
  editing_tag_id: string | null
  current_asset: AssetType | null
  current_tag: TagType | null
  current_asset_list_container: AssetListContainerType
  last_asset_cache_id: string | null
}
