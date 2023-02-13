import { Sort } from "@assets/icons"
import { Asset } from "@components/Asset"
import { MainWrapper } from "@components/Wrappers/MainWrapper"
import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import axios from "axios"
import clsx from "clsx"
import { useState } from "react"
import { useQuery } from "react-query"

interface Props {
  toolbar?: boolean
}

export const AssetList: React.FC<Props> = ({ toolbar }) => {
  const [container, setContainer] = useState<null | Element>(null)
  const [ordering, setOrdering] = useState(false)

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
    <div>
      {toolbar && (
        <MainWrapper className="h-16 w-[560px] mb-4 flex justify-between">
          <div></div>
          <div className="flex gap-2">
            <div
              onClick={() => setOrdering(old => !old)}
              className={clsx("p-1 hover:bg-black/10 flex items-center h-8 w-8 justify-center rounded-full", {
                "bg-black/10": ordering,
              })}
            >
              <Sort
                className="cursor-pointer"
                width={20}
                color={"#020202"}
              />
            </div>
          </div>
        </MainWrapper>
      )}
      <MainWrapper
        // ref={setContainer}
        className="w-[560px] h-fit overflow-y-scroll flex-col"
      >
        {assets?.map(asset => (
          <Asset
            key={asset.id}
            // container={container}
            asset={asset}
          />
        ))}
      </MainWrapper>
    </div>
  )
}
