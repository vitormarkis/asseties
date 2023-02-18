import { Tag } from "@components/atoms"
import Navbar from "@components/Navbar"
import { baseURL, tagCollorPallete } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { AssetObjectReducers } from "@utils/Reducers/AssetsReducers"
import axios, { AxiosResponse } from "axios"
import { useMemo } from "react"
import { useQuery } from "react-query"
import { LoaderFunctionArgs, useParams } from "react-router-dom"

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params
  return await axios.get(baseURL + "/" + id)
}

const AssetPage: React.FC = () => {
  const { id } = useParams() as { id: string }
  const { isLoading, data: rawAsset } = useQuery(
    "asset",
    async () => {
      const res = (await axios.get(baseURL + "/" + id)) as AxiosResponse<AssetType>
      return res.data
    },
    { staleTime: 1000 * 60 }
  )

  if (isLoading || !rawAsset) return <div></div>

  const asset = AssetObjectReducers(rawAsset).colorize(tagCollorPallete)
    // const asset = useMemo(() => AssetObjectReducers({...rawAsset}).colorize(tagCollorPallete), [tagCollorPallete])

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
        <div className="sm:w-[560px] w-full flex flex-col justify-center p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg drop-shadow-md">{asset.asset_name}</h1>
          </div>
          <p className="text-zinc-400 text-xs">{asset.created_at}</p>
          <div className="my-2 flex gap-2 flex-wrap">
            {asset.tags.map(tag => (
              <Tag
                key={tag.id}
                textColor="white"
                tag={tag}
                asset={asset}
                popover
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetPage
