import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { useAppSelector } from "@features/store"
import { queryClient } from "@services/queryClient"
import { CacheReducers } from "@utils/Reducers/CacheReducers"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Tag } from "./atoms"
import { Circle } from "./quark/Circle"

interface Props {
  container?: Element | null
  asset: AssetType
}

export function Asset({ container, asset }: Props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { context } = useAppSelector(state => state)

  function handleRemoveAsset(assetId: string) {
    CacheReducers(queryClient, "assets").asset().remove(assetId)
    axios.delete(baseURL + "/" + assetId)
  }

  function handleEditAsset(assetId: string) {
    navigate("/edit/" + assetId)
  }

  function handleAddTagsClick(assetId: string) {
    navigate(`/addTags/${assetId}`)
  }

  return (
    <div
      id="assets-list"
      key={asset.id}
      className="border-b-zinc-300 border-b mb-3 flex flex-col pb-2 gap-0.5 last:border-none last:mb-0 last:pb-0"
    >
      <div className="flex gap-2 items-center">
        <Circle onClick={() => handleRemoveAsset(asset.id)} className="bg-red-700" />
        <Circle onClick={() => handleEditAsset(asset.id)} className="bg-blue-600"
        />
        <p className={context.editing_asset_id === asset.id ? "editing" : ""}>{asset.asset_name}</p>
      <Circle onClick={() => handleAddTagsClick(asset.id)} className="bg-green-600 ml-auto" />
      </div>
      <p className="text-zinc-400 text-xs truncate">{String(asset.created_at)}</p>
      <div className="my-2 flex gap-2 flex-wrap">
        {asset.tags.map(tag => (
          <Tag
            key={tag.id}
            // container={container}
            bg="blueviolet"
            color="white"
            tag={tag}
            asset={asset}
            popover
          />
        ))}
      </div>
    </div>
  )
}
