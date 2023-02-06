import axios from "axios"
import React, { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { baseURL, Fruit } from "./Fruits"
import { addNewFruitToCache, eraseFields } from "./utils"

export interface Fields {
  fruit_name: string
  note: string
}

export function Form() {
  const [fields, setFields] = useState<Fields>({ fruit_name: "", note: "" })
  const queryClient = useQueryClient()

  async function handleClickButton() {
    const id = Math.random().toString(36).substring(2, 9).toUpperCase()
    const created_at = String(new Date())
    const newFruit = { id, ...fields, created_at } as unknown
    // queryClient.invalidateQueries("fruits")
    addNewFruitToCache(newFruit as Fruit, queryClient)
    setFields((prevState) => eraseFields(prevState))
    await axios.post(baseURL, newFruit)
  }
  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget
    setFields((prevValue) => ({ ...prevValue, [name]: value }))
  }

  useEffect(() => console.log(fields), [fields])

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
      <div className="flex justify-end">
        <button
          onClick={handleClickButton}
          className="py-2 px-4 rounded-full bg-blue-600 font-base text-sm text-white">
          Enviar
        </button>
      </div>
    </div>
  )
}
