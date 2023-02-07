import { resetEditingId } from "@features/context-slice"
import { setFields, setOneField } from "@features/fields-slice"
import { Fruit, KeyofFields } from "@features/fields-slice/types"
import { useAppSelector } from "@features/store"
import {
  addNewFruitToCache,
  checkDifference,
  eraseFields,
  generateNewFruit,
  updateFruitInCache,
} from "@utils/index"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { baseURL } from "../routes/fruitsList"

export function Form() {
  const dispatch = useDispatch()
  const { fields, context } = useAppSelector((state) => state)

  const queryClient = useQueryClient()
  const [isDifferent, setIsDifferent] = useState(false)

  const fruitsInCache = queryClient.getQueryData<Fruit[]>("fruits")!

  useEffect(() => {
    if (!fruitsInCache) return
    const editingFruit = fruitsInCache.find((fruit) => fruit.id === context.editing_id)
    if (!editingFruit) return
    const isDifferentValue = checkDifference(editingFruit, fields)
    setIsDifferent(isDifferentValue)
  }, [fields])

  async function handleClickButton() {
    if (!context.editing_id) {
      const newFruit = generateNewFruit(fields)
      addNewFruitToCache(newFruit, queryClient)
      dispatch(setFields(eraseFields(fields)))
      await axios.post(baseURL, newFruit)
    } else {
      axios.patch(baseURL + "/" + context.editing_id, { ...fields })
      updateFruitInCache(context.editing_id, queryClient, { ...fields })
      dispatch(resetEditingId())
      dispatch(setFields(eraseFields(fields)))
    }
  }
  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget
    dispatch(setOneField({ key: name as KeyofFields, value }))
  }

  function handleBackButton() {
    dispatch(resetEditingId())
    dispatch(setFields(eraseFields(fields)))
  }

  return (
    <div className="w-[480px] flex flex-col gap-3">
      <div className="flex text-sm [&_span]:w-[80px] items-center">
        <span>Fruit:</span>
        <input
          name="fruit_name"
          className="w-full py-1 px-3 rounded-sm shadow-sh"
          type="text"
          placeholder="Pineapple"
          onChange={handleOnChangeInput}
          value={fields.fruit_name}
        />
      </div>
      <div className="flex text-sm [&_span]:w-[80px] items-center">
        <span>Note:</span>
        <input
          name="note"
          className="w-full py-1 px-3 rounded-sm shadow-sh"
          type="text"
          placeholder="8.7"
          onChange={handleOnChangeInput}
          value={fields.note}
        />
      </div>
      <div className="flex justify-end gap-2">
        {context.editing_id && (
          <button
            onClick={handleBackButton}
            className="py-2 px-4 rounded-full bg-emerald-600 font-base text-sm text-white">
            Voltar
          </button>
        )}
        {(!context.editing_id || isDifferent) && (
          <button
            onClick={handleClickButton}
            className="py-2 px-4 rounded-full bg-blue-600 font-base text-sm text-white">
            {context.editing_id ? "Atualizar" : "Enviar"}
          </button>
        )}
      </div>
    </div>
  )
}
