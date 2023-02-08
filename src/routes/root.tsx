import { Outlet } from "react-router-dom"
import { AssetList } from "./assetList"

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-zinc-100 w-screen h-screen gap-12">
      <Outlet />
      <AssetList />
    </div>
  )
}
