import NavbarLink from "@components/NavbarLink"
import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { queryClient } from "@services/queryClient"
import axios from "axios"
import { HTMLAttributes } from "react"
import { NavbarContainer } from "./styles"

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Navbar: React.FC<Props> = ({ ...rest }) => {
  const asset = queryClient.getQueryData<AssetType>("asset")!
  const { id } = asset ?? {}

  return (
    <div
      className={`
      p-4 flex flex-col cursor-pointer shadow-lg shadow-black/30`}
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
