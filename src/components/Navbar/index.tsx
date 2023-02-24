import NavbarLink from "@components/NavbarLink"
import { AssetType } from "@features/asset-slice/types"
import { useAppSelector } from "@features/store"
import { queryClient } from "@services/queryClient"
import { HTMLAttributes } from "react"
import { NavbarContainer } from "./styles"

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Navbar: React.FC<Props> = ({ ...rest }) => {
  const { last_asset_cache_id } = useAppSelector(state => state.context)
  const asset = queryClient.getQueryData<AssetType>(['asset', last_asset_cache_id])
  const { id } = asset ?? {}

  return (
    <div
    id="navbar"
      className={`
      p-2 flex flex-row cursor-pointer shadow-lg shadow-black/30 w-full z-20 bg-white`}
      {...rest}
    >
      <NavbarContainer>
        <NavbarLink
          to="/"
          icon="home"
          label="Home"
        />
        <NavbarLink
          to="/tags-library"
          icon="library"
          label="Tags Library"
        />
        <NavbarLink
          to={"/asset/" + `${id ?? ""}`}
          icon="asset"
          label="Asset"
        />
      </NavbarContainer>
    </div>
  )
}

export default Navbar
