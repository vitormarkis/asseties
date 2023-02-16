import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import axios, { AxiosResponse } from "axios"

export async function atualizarTags() {
  const { data: assets } = (await axios.get(baseURL)) as AxiosResponse<AssetType[]>

  const updatedAssets = assets.map(asset => ({
    ...asset,
    tags: asset.tags.map(tag => ({ ...tag, info: "" })),
  }))

  updatedAssets.forEach(async asset => {
    await axios.put(baseURL + "/" + asset.id, asset)
  })
}

//   atualizarTags()
