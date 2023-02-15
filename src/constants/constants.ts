import { TagCategoryObject } from "@features/tag-slice/types"
import { TagCollorPallete } from "@myTypes/colorTypes"
import { SortingAssetObjectProps } from "@myTypes/index"

export const baseURL = "http://localhost:3000/assets"

export const tagCategories: TagCategoryObject[] = [
  {
    label: "Technology",
    value: "technology",
  },
  {
    label: "Framework",
    value: "framework",
  },
  {
    label: "Design Pattern",
    value: "design_pattern",
  },
  {
    label: "Approach",
    value: "approach",
  },
  {
    label: "Library",
    value: "library",
  },
  {
    label: "Style",
    value: "style",
  },
]

export const sortingOptions: SortingAssetObjectProps[] = [
  {
    label: "Nome",
    value: "asset_name",
  },
  {
    label: "Criado",
    value: "created_at",
  },
  {
    label: "Modificado",
    value: "updated_at",
  },
]

export const tagCollorPallete: TagCollorPallete[] = [
  {
    category: "technology",
    color: "fuchsia",
  },
  {
    category: "framework",
    color: "darkcyan",
  },
  {
    category: "design_pattern",
    color: "crimson",
  },
  {
    category: "approach",
    color: "darkcyan",
  },
  {
    category: "library",
    color: "royalblue",
  },
  {
    category: "style",
    color: "gold",
  },
]
