import { setAssetFormFields, setOneAssetFormField } from "@features/asset-slice"
import { Asset, KeyofAssetFormFields } from "@features/asset-slice/types"
import { resetEditingId } from "@features/context-slice"
import { useAppSelector } from "@features/store"
import {
  addNewAssetToCache,
  checkDifference,
  eraseFields,
  generateNewAsset,
  updateAssetInCache,
} from "@utils/index"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { baseURL } from "../routes/fruitsList"

export function AssetForm() {
  const { asset, context } = useAppSelector((state) => state)
  const dispatch = useDispatch()

  const queryClient = useQueryClient()
  const [isDifferent, setIsDifferent] = useState(false)

  const assetsInCache = queryClient.getQueryData<Asset[]>("assets")!

  useEffect(() => {
    if (!assetsInCache) return
    const editingAsset = assetsInCache.find((asset) => asset.id === context.editing_id)
    if (!editingAsset) return
    const isDifferentValue = checkDifference(editingAsset, asset.fields)
    setIsDifferent(isDifferentValue)
  }, [asset.fields])

  async function handleClickButton() {
    if (!context.editing_id) {
      // Add new asset
      const newAsset = generateNewAsset(asset.fields)
      addNewAssetToCache(newAsset, queryClient)
      dispatch(setAssetFormFields(eraseFields(asset.fields)))
      await axios.post(baseURL, newAsset)
    } else {
      // Update asset fields
      axios.patch(baseURL + "/" + context.editing_id, { ...asset.fields })
      updateAssetInCache(context.editing_id, queryClient, { ...asset.fields })
      dispatch(resetEditingId())
      dispatch(setAssetFormFields(eraseFields(asset.fields)))
    }
  }
  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget
    dispatch(setOneAssetFormField({ key: name as KeyofAssetFormFields, value }))
  }

  function handleBackButton() {
    dispatch(resetEditingId())
    dispatch(setAssetFormFields(eraseFields(asset.fields)))
  }

  return (
    <div className="w-[480px] flex flex-col gap-3">
      <div className="flex text-sm [&_span]:w-[80px] items-center">
        <span>Fruit:</span>
        <input
          name="asset_name"
          className="w-full py-1 px-3 rounded-sm shadow-sh"
          type="text"
          placeholder="Insira o nome de algo..."
          onChange={handleOnChangeInput}
          value={asset.fields.asset_name}
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
