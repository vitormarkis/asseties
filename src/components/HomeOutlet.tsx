import { useNavigate } from "react-router-dom"

export function HomeOutlet() {
  const navigate = useNavigate()

  return (
    <div>
      <button className="px-3 py-1 rounded-full bg-emerald-500 font-thin shadow-sm shadow-black/30 text-white" onClick={() => navigate("/edit")}>+ Novo</button>
    </div>
  )
}
