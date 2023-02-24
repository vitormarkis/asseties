import { ArrowBack } from "@assets/icons"
import AssetPageDetails from "@components/AssetPageDetails"
import ListAsset from "@components/ListAssets"
import Navbar from "@components/Navbar"
import { baseURL } from "@constants/constants"
import { setLastAssetCacheId } from "@features/context-slice"
import { useAppSelector } from "@features/store"
import axios from "axios"
import { useDispatch } from "react-redux"
import { LoaderFunctionArgs, useNavigate, useParams } from "react-router-dom"

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params ?? {}
  return id ? await axios.get(baseURL + "/" + id) : null
}

const AssetPage: React.FC = () => {
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()
  const { last_asset_cache_id } = useAppSelector(state => state.context)
  const dispatch = useDispatch()
  dispatch(setLastAssetCacheId(last_asset_cache_id ?? id))

  return (
    <div
      id="asset-page"
      className="h-screen w-screen"
    >
      <Navbar style={{ gridArea: "navbar" }} />
      <div
        style={{ gridArea: "main" }}
        className="p-4"
      >
        <button className="p-1 rounded-full flex items-center justify-center bg-emerald-600 mb-6">
          <ArrowBack
            width={16}
            color="#fff"
            onClick={() => navigate(-1)}
          />
        </button>
        {id ? <AssetPageDetails id={id} /> : <ListAsset />}
      </div>
    </div>
  )
}

export default AssetPage
