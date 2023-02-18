import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { useAppSelector } from "@features/store"
import { queryClient } from "@services/queryClient"
import { Animation } from "@utils/animations"
import { CacheReducers } from "@utils/Reducers/CacheReducers"
import axios from "axios"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Circle } from "./quark/Circle"

interface Props {
  container?: Element | null
  asset: AssetType
  index: number
  animation?: boolean
}

export function CompactAsset({ asset, index, animation = true }: Props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { context } = useAppSelector(state => state)

  const parsedData = new Date(asset.updated_at)
  const localeDate = parsedData.toLocaleDateString()

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
    <motion.div
      variants={animation ? Animation.emerge(index) : {}}
      initial="hidden"
      animate="show"
      exit="exit"
      id="assets-list"
      key={asset.id}
      className="cursor-pointer border-b-zinc-300 border-b mb-3 flex items-center justify-between pb-2 gap-0.5 last:border-none last:mb-0 last:pb-0"
      onClick={() => {
        queryClient.invalidateQueries('asset')
        navigate(`/asset/${asset.id}`)
      }}
    >
      <div className="flex gap-2 items-center">
        <Circle
          onClick={() => handleEditAsset(asset.id)}
          className="bg-blue-600"
        />
        <p className={`leading-3 ${context.editing_asset_id === asset.id ? "editing" : ""}`}>
          {asset.asset_name}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-zinc-400 text-[10px] leading-3 truncate">{localeDate}</p>
        <Circle
          onClick={() => handleRemoveAsset(asset.id)}
          className="bg-red-700"
        />
      </div>
    </motion.div>
  )
}
