import { TagCategoryObject } from "@features/tag-slice/types"
import { TagCollorPallete } from "@myTypes/colorTypes"
import { SortingAssetObjectProps } from "@myTypes/index"

export const baseURL = "http://localhost:3000/assets"

export const casingWhitelist = ["tag_name", "asset_name", "info"]

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
    label: "Utilitary Library",
    value: "utilitary_library",
  },
  {
    label: "Style",
    value: "style",
  },
  {
    label: "Code Fragments",
    value: "code_fragments",
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
    color: "#2a4",
  },
  {
    category: "framework",
    color: "#C455A8",
  },
  {
    category: "design_pattern",
    color: "#084C61",
  },
  {
    category: "approach",
    color: "#564787",
  },
  {
    category: "library",
    color: "#985277",
  },
  {
    category: "style",
    color: "#340068",
  },
  {
    category: "code_fragments",
    color: "#026",
  },
  {
    category: "utilitary_library",
    color: "#6E44FF",
  },
]
