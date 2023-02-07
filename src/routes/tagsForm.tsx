import { Fruit } from "@features/fields-slice/types"
import { useAppSelector } from "@features/store"
import { setOneTagField, setTagFields } from "@features/tags-slice"
import { KeyofTagFields } from "@features/tags-slice/types"
import { addNewTagInCache, eraseFields, generateNewTag } from "@utils/index"
import axios from "axios"
import { useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { baseURL } from "./fruitsList"

const categories = ["Color", "Weight", "Flavor"]

export default function TagsForm() {
  const { state } = useLocation()
  const { fruit } = state as { fruit: Fruit }
  const navigate = useNavigate()
  const { tagFields } = useAppSelector((state) => state)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.currentTarget
    dispatch(setOneTagField({ key: name as KeyofTagFields, value }))
  }

  async function handleSendClick() {
    const newTag = generateNewTag(tagFields)
    const fruitWithTagAdded = { tags: [...fruit.tags, newTag] }
    addNewTagInCache(fruit.id, newTag, queryClient)
    axios.patch(baseURL + "/" + fruit.id, fruitWithTagAdded)
    // await queryClient.invalidateQueries("fruits")
    navigate(-1)
    dispatch(setTagFields(eraseFields(tagFields)))
  }

  function handleBackClick() {
    navigate(-1)
    dispatch(setTagFields(eraseFields(tagFields)))
  }

  return (
    <div className="flex flex-col items-center p-12 bg-zinc-100 h-screen w-screen gap-12">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg drop-shadow-md">{fruit.fruit_name}</h1>
          <p className="italic text-zinc-600">{fruit.note}</p>
        </div>
        <p className="text-zinc-400 text-xs">{fruit.created_at}</p>
      </div>

      <div className="w-[480px] flex [&_span]:w-[110px] flex-col gap-3">
        <div className="flex text-sm items-center">
          <span>Tag name:</span>
          <input
            name="tag_name"
            className="grow py-1 px-3 rounded-sm shadow-sh"
            type="text"
            placeholder="Vermelha"
            value={tagFields.tag_name}
            onChange={handleOnChangeInput}
          />
        </div>
        <div className="flex text-sm items-center">
          <span>Category:</span>
          <select
            name="category"
            className="grow py-1 px-3 rounded-sm shadow-sh"
            value={tagFields.category}
            onChange={handleOnChangeInput}
            placeholder="8.7">
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleBackClick}
            className="py-2 px-4 rounded-full bg-emerald-600 font-base text-sm text-white">
            Voltar
          </button>
          <button
            onClick={handleSendClick}
            className="py-2 px-4 rounded-full bg-blue-600 font-base text-sm text-white">
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
