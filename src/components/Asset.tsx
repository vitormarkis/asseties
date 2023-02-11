import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { setCurrentAsset } from "@features/context-slice"
import { useAppSelector } from "@features/store"
import { queryClient } from "@services/queryClient"
import { removeAssetFromCache } from "@utils/index"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Tag } from "./atoms"

interface Props {
  container: Element | null
  asset: AssetType
}

export function Asset({ container, asset }: Props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { context } = useAppSelector(state => state)

  function handleDeleteAsset(assetId: string) {
    removeAssetFromCache(assetId, queryClient)
    axios.delete(`${baseURL}/${assetId}`)
  }

  function handleEditAsset(assetId: string) {
    const assets = queryClient.getQueryData<AssetType[]>("assets")
    if (!assets) throw new Error("Não foi possível encontrar os assets.")
    const asset = assets.find(asset => asset.id === assetId)
    if (!asset) throw new Error("Não foi possível encontrar o asset desejado.")

    dispatch(setCurrentAsset(asset))
    navigate("/edit")
  }

  function handleAddTags(assetId: string) {
    const assets = queryClient.getQueryData<AssetType[]>("assets")!
    const asset = assets.find(asset => asset.id === assetId)
    if (!asset) throw new Error("Não foi encotrado um asset com esse id.")
    dispatch(setCurrentAsset(asset))

    navigate(`/addTags/${assetId}`)
  }

  return (
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
            key={tag.id}
            _container={container}
            _bg="blueviolet"
            _color="white"
            _tag={tag}
            _asset={asset}
            _popover
          />
        ))}
      </div>
    </div>
  )
}
