import AssetLibraryList from "@components/AssetLibraryList"
import Navbar from "@components/Navbar"
import TagLibraryList from "@components/TagLibraryList"
import { MainWrapper } from "@components/Wrappers/MainWrapper"
import { baseURL, tagCollorPallete } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { useQuery } from "@tanstack/react-query"
import { AssetsArrayReducers } from "@utils/Reducers/AssetsReducers"
import axios from "axios"
import { HTMLAttributes, useState } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {}

const TagsLibrary: React.FC<Props> = ({ ...rest }) => {
  const [seeingTagName, setSeeingTagName] = useState("")

  const { data: assets, isLoading } = useQuery<AssetType[]>(
    ["assets"],
    async () => {
      const response = await axios.get(baseURL)
      return response.data
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  )

  if (isLoading) {
    return <>Loading...</>
  }

  const coloredAssets = AssetsArrayReducers(assets!).colorize(tagCollorPallete)

  return (
    <div
      id="tags-library"
      className="w-screen h-screen overflow-auto bg-gray-100"
      {...rest}
    >
      <Navbar style={{ gridArea: "navbar" }} />
      <div style={{ gridArea: "main" }} className='h-screen p-4 flex gap-4 [&>div]:basis-0'>
        <div className="overflow-scroll scroll-style p-4" style={{flexBasis: 240}}>
          <TagLibraryList
            seeingTagName={seeingTagName}
            setSeeingTagName={setSeeingTagName}
            assets={coloredAssets}
          />
        </div>
        <MainWrapper className="grow overflow-scroll">
          <AssetLibraryList
            assets={coloredAssets}
            seeingTagName={seeingTagName}
            setSeeingTagName={setSeeingTagName}
          />
        </MainWrapper>
      </div>
    </div>
  )
}

export default TagsLibrary
