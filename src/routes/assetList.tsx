import Tag from "@components/atoms/Tag"
import { baseURL } from "@constants/constants"
import { setAssetFormFields } from "@features/asset-slice"
import { AssetType } from "@features/asset-slice/types"
import { setEditingAssetId } from "@features/context-slice"
import { useAppSelector } from "@features/store"
import axios from "axios"
import { useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeAssetFromCache } from "../utils"

export function AssetList() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { context } = useAppSelector(state => state)
  const [container, setContainer] = useState<null | Element>(null)

  const {
    data: assets,
    isLoading,
    isError,
  } = useQuery<AssetType[]>(
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
    const assets = queryClient.getQueryData<AssetType[]>("assets")!
    const { asset_name } = assets.find(asset => asset.id === assetId)!

    dispatch(setEditingAssetId(assetId))
    dispatch(setAssetFormFields({ asset_name }))
    navigate("/edit")
  }

  function handleAddTags(assetId: string) {
    const assets = queryClient.getQueryData<AssetType[]>("assets")!
    const asset = assets.find(asset => asset.id === assetId)

    navigate(`/addTags/${assetId}`, { state: { asset } })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-3">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div
      ref={setContainer}
      className="w-[560px] text-sm p-4 rounded-lg bg-zinc-200 h-fit overflow-y-scroll"
    >
      {assets?.map(asset => (
        <div
          id="assets-list"
          key={asset.id}
          className="border-b-zinc-300 border-b mb-3 flex flex-col pb-2 gap-0.5"
        >
          <div className="flex gap-2 items-center">
            <div
              onClick={() => handleDeleteAsset(asset.id)}
              className="text-white font-black cursor-pointer bg-red-700 rounded-full w-3 h-3 relative"
            />
            <div
              onClick={() => handleEditAsset(asset.id)}
              className="text-white font-black cursor-pointer bg-blue-600 rounded-full w-3 h-3 relative"
            />
            <p className={context.editing_asset_id === asset.id ? "editing" : ""}>{asset.asset_name}</p>
            <div
              onClick={() => handleAddTags(asset.id)}
              className="text-white font-black cursor-pointer bg-green-600 ml-auto rounded-full w-3 h-3 relative"
            />
          </div>
          <p className="text-zinc-400 text-xs">{String(asset.created_at)}</p>
          <div className="my-2 flex gap-2 flex-wrap">
            {asset.tags.map(tag => (
              <Tag
                container={container}
                key={tag.id}
                bg="crimson"
                color="white"
                tag={tag}
                assetId={asset.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
