import { HTMLAttributes } from "react"
import { NavLink } from "react-router-dom"

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Navbar: React.FC<Props> = ({ ...rest }) => {
  return (
    <div
      className="border-r-2 border-zinc-800 p-4 flex flex-col"
      {...rest}
    >
      <div className="flex flex-col gap-2">
        <NavLink to="/" className={({isActive}) => isActive ? 'bg-blue-400' : 'bg-red-300'}>Home</NavLink>
        <NavLink to="/tags-library" className={({isActive}) => isActive ? 'bg-blue-400' : 'bg-red-300'}>Tags Library</NavLink>
      </div>
    </div>
  )
}
