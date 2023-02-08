import { useNavigate } from "react-router-dom"
import Button from "./atoms/Button"

export function HomeOutlet() {
  const navigate = useNavigate()

  return (
    <div>
      <Button
        onClick={() => navigate("/edit")}
        color="white"
        bg="green"
        rounded="full"
        value="+ Novo"
      />
    </div>
  )
}
