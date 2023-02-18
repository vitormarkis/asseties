import { NavLink } from "react-router-dom"

import { Asset, Home, TagsLibrary } from "./styles"

export type Icon = "home" | "library" | "asset"

interface Props {
  to: string
  label: string
  icon: Icon
}

const NavbarLink: React.FC<Props> = ({ to, label, icon, ...rest }: Props) => {
  const renderIcon: Record<Icon, React.ReactNode> = {
    home: <Home />,
    library: <TagsLibrary />,
    asset: <Asset />,
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
    flex items-center gap-2 py-1 px-2 rounded-md truncate
    ${isActive ? "active" : ""}
    `}
      {...rest}
    >
      <div className="flex items-center justify-center">
      {renderIcon[icon]}
      </div>
      <p>{label}</p>
    </NavLink>
  )
}

export default NavbarLink
