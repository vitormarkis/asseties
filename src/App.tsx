import { Form } from "./Form"
import { Fruits } from "./Fruits"

function App() {

  return (
    <div className="flex flex-col items-center p-12 bg-zinc-100 h-screen w-screen gap-12">
      <Form />
      <Fruits />
    </div>
  )
}

export default App
