import { Asset } from "@components/Asset"
import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"

export function AssetList() {
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
        <Asset
          key={asset.id}
          container={container}
          asset={asset}
        />
      ))}
    </div>
  )
}
