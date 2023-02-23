import AssetListCompact from "@components/AssetListCompact"
import ListAsset from "@components/ListAssets"
import Navbar from "@components/Navbar"
import TagList from "@components/TagList"
import { baseURL } from "@constants/constants"
import axios from "axios"
import { LoaderFunctionArgs, useParams } from "react-router-dom"

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params ?? {}
  if (!id) {
    return null
  } else {
    return await axios.get(baseURL + "/" + id)
  }
}

const AssetPage: React.FC = () => {
  const { id } = useParams() as { id: string }

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
        {id ? <TagList id={id} /> : (
          <ListAsset />
        )}
      </div>
    </div>
  )
}

export default AssetPage
