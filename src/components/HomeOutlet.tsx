import { useNavigate } from "react-router-dom"

export function HomeOutlet() {
  const navigate = useNavigate()

  return (
    <div>
      <button className="px-3 py-1 rounded-full bg-cyan-600 font-bold text-white" onClick={() => navigate("/edit")}>+ Novo</button>
    </div>
  )
}
