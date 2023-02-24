import AssetPageDetails from "@components/AssetPageDetails"
import { Button } from "@components/atoms"
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
      className="h-screen w-screen gap-4"
    >
      <Navbar style={{ gridArea: "navbar" }} />
      <div
        style={{ gridArea: "main" }}
        className="p-4"
      >
        <Button
          bg="green"
          rounded="full"
          textColor="white"
          value="Voltar"
          onClick={() => navigate(-1)}
        />
        {id ? <AssetPageDetails id={id} /> : <ListAsset />}
      </div>
    </div>
  )
}

export default AssetPage
