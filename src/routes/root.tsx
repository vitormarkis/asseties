import { Outlet } from "react-router-dom"
import { Fruits } from "./fruitsList"

export default function Home() {
  return (
    <div className="flex flex-col items-center p-12 bg-zinc-100 h-screen w-screen gap-12">
      <Outlet />
      <Fruits />
    </div>
  )
}
