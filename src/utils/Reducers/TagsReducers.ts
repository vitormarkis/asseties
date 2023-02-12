import { TagFormFields, TagType } from "@features/tag-slice/types"
import { generateId } from ".."

export const TagObjectReducers = () => ({
  createTag: (tagFormFields: TagFormFields): TagType => ({ ...generateId(), ...tagFormFields }),
})
