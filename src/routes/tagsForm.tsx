import { Asset } from "@features/asset-slice/types"
import { useAppSelector } from "@features/store"
import { setOneTagFormField, setTagFormFields } from "@features/tag-slice"
import { KeyofTagFormFields, Tag } from "@features/tag-slice/types"
import { addNewTagInCache, eraseFields, generateNewTag, removeTag } from "@utils/index"
import axios from "axios"
import { useState } from "react"
import { useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { baseURL } from "./fruitsList"

const categories = ["Color", "Weight", "Flavor"]

export default function TagsForm() {
  const { state } = useLocation()
  const { fruit: rawFruit } = state as { fruit: Asset }
  const [fruit, setFruit] = useState<Asset>(rawFruit)
  const navigate = useNavigate()
  const { tagFields } = useAppSelector((state) => state)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.currentTarget
    dispatch(setOneTagFormField({ key: name as KeyofTagFormFields, value }))
  }

  async function handleSendClick() {
    const newTag = generateNewTag(tagFields)
    const fruitWithTagAdded = { tags: [...fruit.tags, newTag] }
    addNewTagInCache(fruit.id, newTag, queryClient)
    axios.patch(baseURL + "/" + fruit.id, fruitWithTagAdded)
    // await queryClient.invalidateQueries("fruits")
    navigate(-1)
    dispatch(setTagFormFields(eraseFields(tagFields)))
  }

  function handleDeleteTag(fruitId: string, tag: Tag) {
    const { id: tagId } = tag
    const fruitsInCache = queryClient.getQueryData<Asset[]>("fruits")!
    const { fruits, fruit } = removeTag(fruitId, tagId, fruitsInCache)!
    queryClient.invalidateQueries("fruits")
    queryClient.setQueryData("fruits", fruits)

    setFruit(fruit)
    axios.put(`${baseURL}/${fruitId}`, fruit)
  }

  function handleBackClick() {
    navigate(-1)
    dispatch(setTagFormFields(eraseFields(tagFields)))
  }

  return (
    <div className="flex flex-col items-center p-12 bg-zinc-100 h-screen w-screen gap-12">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg drop-shadow-md">{fruit.fruit_name}</h1>
          <p className="italic text-zinc-600">{fruit.note}</p>
        </div>
        <p className="text-zinc-400 text-xs">{fruit.created_at}</p>
        <div className="my-2 flex gap-2 flex-wrap">
          {fruit.tags.map((tag) => (
            <div
              className="leading-none p-1 rounded-sm bg-zinc-600 text-xs text-white flex gap-2 items-center"
              key={tag.id}>
              <p>{tag.tag_name}</p>
              <p
                onClick={() => handleDeleteTag(fruit.id, tag)}
                className="cursor-pointer p-1 rounded-full bg-zinc-700 mr-1 w-2.5 h-2.5"
              />
            </div>
          ))}
        </div>
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
