import { AssetTypeColored } from "@features/asset-slice/types"
import { TagFormFields, TagType, TagTypeColored } from "@features/tag-slice/types"
import { TagCollorPallete } from "@myTypes/colorTypes"
import { generateId } from ".."

export const TagObjectReducers = (tag?: TagType) => ({
  createTag: (tagFormFields: TagFormFields): TagType => ({ ...generateId(), ...tagFormFields }),
  updateTag: (tagFormFields: TagFormFields): TagType => ({ ...tag!, ...tagFormFields }),
  refresh: (): TagType => ({ ...tag!, updated_at: String(new Date()) }),
  colorize: (collorPallete: TagCollorPallete[]): TagTypeColored => ({
    ...tag!,
    ...(collorPallete.find(color => color.category === tag?.category) ?? { color: "#99cccc" }),
  }),
})
