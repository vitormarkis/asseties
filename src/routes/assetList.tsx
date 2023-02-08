import { baseURL } from "@constants/constants"
import { setAssetFormFields } from "@features/asset-slice"
import { Asset } from "@features/asset-slice/types"
import { setEditingId } from "@features/context-slice"
import { useAppSelector } from "@features/store"
import { Tag } from "@features/tag-slice/types"
import axios from "axios"
import { useQuery, useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeAssetFromCache, removeTag } from "../utils"

export function AssetList() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { context } = useAppSelector((state) => state)

  const {
    data: assets,
    isLoading,
    isError,
  } = useQuery<Asset[]>(
    "assets",
    async () => {
      const res = await axios.get(baseURL)
      return res.data
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  )

  function handleDeleteAsset(assetId: string) {
    removeAssetFromCache(assetId, queryClient)
    axios.delete(`${baseURL}/${assetId}`)
  }

  function handleEditAsset(assetId: string) {
    const assets = queryClient.getQueryData<Asset[]>("assets")!
    const { asset_name } = assets.find((asset) => asset.id === assetId)!

    dispatch(setEditingId(assetId))
    dispatch(setAssetFormFields({ asset_name }))
    navigate("/edit")
  }

  function handleAddTags(assetId: string) {
    const assets = queryClient.getQueryData<Asset[]>("assets")!
    const asset = assets.find((asset) => asset.id === assetId)

    navigate(`/addTags/${assetId}`, { state: { asset } })
  }

  function handleDeleteTag(assetId: string, tag: Tag) {
    const { id: tagId } = tag
    const assetsInCache = queryClient.getQueryData<Asset[]>("assets")!
    const { assets, asset } = removeTag(assetId, tagId, assetsInCache)!
    queryClient.setQueryData("assets", assets)
    axios.put(`${baseURL}/${assetId}`, asset)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-3">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="w-[560px] text-sm p-4 rounded-lg bg-zinc-200 h-fit">
      {assets?.map((asset) => (
        <div
          id="assets-list"
          key={asset.id}
          className="border-b-zinc-300 border-b mb-3 flex flex-col pb-2 gap-0.5">
          <div className="flex gap-2 items-center">
            <div
              onClick={() => handleDeleteAsset(asset.id)}
              className="text-white font-black cursor-pointer bg-red-700 rounded-full w-3 h-3 relative"
            />
            <div
              onClick={() => handleEditAsset(asset.id)}
              className="text-white font-black cursor-pointer bg-blue-600 rounded-full w-3 h-3 relative"
            />
            <p className={context.editing_id === asset.id ? "editing" : ""}>{asset.asset_name}</p>
            <div
              onClick={() => handleAddTags(asset.id)}
              className="text-white font-black cursor-pointer bg-green-600 ml-auto rounded-full w-3 h-3 relative"
            />
          </div>
          <p className="text-zinc-400 text-xs">{String(asset.created_at)}</p>
          <div className="my-2 flex gap-2 flex-wrap">
            {asset.tags.map((tag) => (
              <div
                className="leading-none p-1 rounded-sm bg-zinc-600 text-xs text-white flex gap-2 items-center"
                key={tag.id}>
                <p>{tag.tag_name}</p>
                <p
                  onClick={() => handleDeleteTag(asset.id, tag)}
                  className="cursor-pointer p-1 rounded-full bg-zinc-700 mr-1 w-2.5 h-2.5"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
