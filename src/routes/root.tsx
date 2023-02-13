import { Outlet } from "react-router-dom"
import { AssetList } from "./assetList"

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-zinc-100 w-screen h-screen overflow-scroll">
      <div className="flex items-center justify-center my-4 w-full px-4">
      <Outlet />
      </div>
      <AssetList toolbar />
    </div>
  )
}
