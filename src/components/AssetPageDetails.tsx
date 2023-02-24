import { baseURL, tagCollorPallete } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { queryClient } from "@services/queryClient"
import { useQuery } from "@tanstack/react-query"
import { AssetObjectReducers } from "@utils/Reducers/AssetsReducers"
import axios from "axios"
import { Tag } from "./atoms"

interface Props {
  id: string
}

const AssetPageDetails: React.FC<Props> = ({ id }) => {
  const res = useQuery<AssetType>({
    queryKey: ["asset", id],
    queryFn: async () => {
      const res = await axios.get(baseURL + '/' + id)
      return res.data
    },
    staleTime: 1000 * 600,
    initialData: () => queryClient.getQueryData<AssetType[]>(["assets"])?.find(asset => asset.id === id)
  })

  
  const { isLoading, data: rawAsset } = res

  if (isLoading || !rawAsset) {
    return <div>Carregando...</div>
  }
  console.log({rawAsset})

  const asset = AssetObjectReducers(rawAsset).colorize(tagCollorPallete)

  return (
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
  )
}

export default AssetPageDetails
