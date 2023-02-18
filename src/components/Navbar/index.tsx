import NavbarLink from "@components/NavbarLink"
import { HTMLAttributes, useState } from "react"
import { NavbarContainer } from "./styles"

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Navbar: React.FC<Props> = ({ ...rest }) => {

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
      </NavbarContainer>
    </div>
  )
}

export default Navbar
