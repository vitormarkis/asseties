import { useNavigate } from "react-router-dom"
import { Button } from "./atoms"

export function HomeOutlet() {
  const navigate = useNavigate()

  return (
    <div>
      <Button
        onClick={() => navigate("/add")}
        textColor="white"
        bg="green"
        rounded="full"
        value="+ Novo"
      />
    </div>
  )
}
