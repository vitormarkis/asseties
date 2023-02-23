import AssetLibraryList from "@components/AssetLibraryList"
import Navbar from "@components/Navbar"
import TagLibraryList from "@components/TagLibraryList"
import { baseURL, tagCollorPallete } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { AssetsArrayReducers } from "@utils/Reducers/AssetsReducers"
import axios from "axios"
import { HTMLAttributes, useState } from "react"
import { useQuery } from "react-query"

interface Props extends HTMLAttributes<HTMLDivElement> {}

const TagsLibrary: React.FC<Props> = ({ ...rest }) => {
  const [seeingTagName, setSeeingTagName] = useState("")

  const { data: assets, isLoading } = useQuery<AssetType[]>(
    "assets",
    async () => {
      const response = await axios.get(baseURL)
      return response.data
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  )

  if(isLoading) {
    return <>Loading...</>
  }

  const coloredAssets = AssetsArrayReducers(assets!).colorize(tagCollorPallete)

  return (
    <div
      id="tags-library"
      className="w-screen h-screen gap-4"
      {...rest}
    >
      <Navbar style={{ gridArea: "navbar" }} />
      <div
        className="container bg-zinc-200 overflow-auto"
        style={{ gridArea: "tags" }}
      >
        <TagLibraryList
          seeingTagName={seeingTagName}
          setSeeingTagName={setSeeingTagName}
          assets={coloredAssets}
        />
      </div>
      <div
        className="container bg-zinc-200"
        style={{ gridArea: "assets" }}
      >
        <AssetLibraryList
          assets={coloredAssets}
          seeingTagName={seeingTagName}
          setSeeingTagName={setSeeingTagName}
        />
      </div>
    </div>
  )
}

export default TagsLibrary
