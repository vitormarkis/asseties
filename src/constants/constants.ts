import { SortingAssetObjectProps } from "@myTypes/index"

export const baseURL = "http://localhost:3000/assets"

export const categories = ["Technology", "Framework", "Design Pattern", "Approach"]

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
