import Navbar from "@components/Navbar"
import { Outlet } from "react-router-dom"
import { AssetList } from "./assetList"

export default function Home() {
  return (
    <div id="layout" className="w-screen h-screen bg-zinc-100 overflow-auto">
      <Navbar style={{ gridArea: 'navbar' }} />
      <div className="flex flex-col items-center" style={{ gridArea: 'outlet' }}>
        <div className="min-h-[100px] flex items-center justify-center w-full px-4">
          <Outlet />
        </div>
        <div style={{ gridArea: 'main' }}>
        <AssetList toolbar />
        </div>
      </div>
    </div>
  )
}
