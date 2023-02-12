import { TagFormFields, TagType } from "@features/tag-slice/types"
import { generateId } from ".."

export const TagObjectReducers = (tag: TagType) => ({
  createTag: (tagFormFields: TagFormFields): TagType => ({ ...generateId(), ...tagFormFields }),
  updateTag: (tagFormFields: TagFormFields): TagType => ({ ...tag, ...tagFormFields }),
  refresh: (): TagType => ({ ...tag, updated_at: String(new Date()) }),
})
