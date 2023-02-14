import { Outlet } from "react-router-dom"
import { AssetList } from "./assetList"

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-zinc-100 w-screen h-screen overflow-scroll">
      <div className="min-h-[100px] flex items-center justify-center w-full px-4">
        <Outlet />
      </div>
      <AssetList toolbar />
    </div>
  )
}
