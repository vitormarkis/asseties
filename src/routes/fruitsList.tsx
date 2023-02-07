import { setEditingId } from "@features/context-slice"
import { setFields } from "@features/fields-slice"
import { Fruit } from "@features/fields-slice/types"
import { Tag } from "@features/tags-slice/types"
import axios from "axios"
import { useQuery, useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeFruitFromCache, removeTag } from "../utils"

export const baseURL = "http://localhost:3000/fruits"

export function Fruits() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    data: fruits,
    isLoading,
    isError,
  } = useQuery<Fruit[]>(
    "fruits",
    async () => {
      const res = await axios.get(baseURL)
      return res.data
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  )

  function handleDeleteFruit(fruitId: string) {
    removeFruitFromCache(fruitId, queryClient)
    axios.delete(`${baseURL}/${fruitId}`)
  }

  function handleEditFruit(fruitId: string) {
    const fruitsInCache = queryClient.getQueryData<Fruit[]>("fruits")!
    const { fruit_name, note } = fruitsInCache.find((fruit) => fruit.id === fruitId)!
    dispatch(setEditingId(fruitId))
    console.log({ fruit_name, note })
    dispatch(setFields({ fruit_name, note }))
  }

  function handleAddTags(fruitId: string) {
    const getFruitsInCache = queryClient.getQueryData<Fruit[]>("fruits")!
    const fruit = getFruitsInCache.find((fruit) => fruit.id === fruitId)

    navigate(`/addTags/${fruitId}`, { state: { fruit } })
  }

  function handleDeleteTag(fruitId: string, tag: Tag) {
    const { id: tagId } = tag
    const fruitsInCache = queryClient.getQueryData<Fruit[]>("fruits")!
    const { fruits, fruit, tags } = removeTag(fruitId, tagId, fruitsInCache)!
    queryClient.setQueryData("fruits", fruits)
    axios.put(`${baseURL}/${fruitId}`, fruit)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-3">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="h-full w-[560px] text-sm p-4 rounded-lg bg-zinc-200 overflow-y-scroll scroll-">
      {fruits?.map((fruit) => (
        <div
          key={fruit.id}
          className="border-b-zinc-300 border-b mb-3 flex flex-col pb-2 gap-0.5">
          <div className="flex gap-2 items-center">
            <div
              onClick={() => handleDeleteFruit(fruit.id)}
              className="text-white font-black cursor-pointer bg-red-700 rounded-full w-3 h-3 relative"
            />
            <div
              onClick={() => handleEditFruit(fruit.id)}
              className="text-white font-black cursor-pointer bg-blue-600 rounded-full w-3 h-3 relative"
            />
            <p>{fruit.fruit_name}</p>
            <div
              onClick={() => handleAddTags(fruit.id)}
              className="text-white font-black cursor-pointer bg-green-600 ml-auto rounded-full w-3 h-3 relative"
            />
          </div>
          <p className="text-zinc-400 text-xs">{String(fruit.created_at)}</p>
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
      ))}
    </div>
  )
}
