import { Outlet } from "react-router-dom"
import { AssetList } from "./assetList"

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-zinc-100 w-screen h-screen gap-12">
      <div className="min-h-[68px] flex items-center justify-center">
      <Outlet />
      </div>
      <AssetList />
    </div>
  )
}
