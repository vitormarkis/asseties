import { Sort } from "@assets/icons"
import { Asset } from "@components/Asset"
import { IconHover } from "@components/Wrappers/IconHover"
import { MainWrapper } from "@components/Wrappers/MainWrapper"
import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"

interface Props {
  toolbar?: boolean
}

export const AssetList: React.FC<Props> = ({ toolbar }) => {
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
    <div>
      {toolbar && (
        <MainWrapper className="h-16 w-[560px] mb-4 flex justify-between">
          <div></div>
          <div className="flex gap-2">
            <IconHover>
              <Sort
                className="cursor-pointer"
                width={20}
                color={"#020202"}
              />
            </IconHover>
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
