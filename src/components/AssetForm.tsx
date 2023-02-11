import { baseURL } from "@constants/constants"
import { setAssetFormFields } from "@features/asset-slice"
import { AssetFormFields, AssetType } from "@features/asset-slice/types"
import { resetCurrentAsset, resetEditingAssetId } from "@features/context-slice"
import { useAppSelector } from "@features/store"
import {
  addNewAssetToCache,
  checkDifference,
  eraseFields,
  generateNewAsset,
  getUpdatedAsset,
  updateAssetInCache,
} from "@utils/index"
import axios from "axios"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { Input } from "./atoms"
import Button from "./atoms/Button"

export function AssetForm() {
  const { asset, context } = useAppSelector(state => state)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm<AssetFormFields>()

  const queryClient = useQueryClient()
  const [isDifferent, setIsDifferent] = useState(false)

  const assetsInCache = queryClient.getQueryData<AssetType[]>("assets")!

  useEffect(() => {
    if (!assetsInCache) return
    const editingAsset = assetsInCache.find(asset => asset.id === context.editing_asset_id)
    if (!editingAsset) return
    const isDifferentValue = checkDifference(editingAsset, asset.fields)
    setIsDifferent(isDifferentValue)
  }, [asset.fields])

  // function handleBackButton() {
  //   dispatch(resetEditingAssetId())
  //   dispatch(setAssetFormFields(eraseFields(asset.fields)))
  // }

  const onSubmit: SubmitHandler<AssetFormFields> = async assetFormFields => {
    if (!context.current_asset) {
      // Add new asset
      const newAsset = generateNewAsset(asset.fields)
      addNewAssetToCache(newAsset, queryClient)
      dispatch(setAssetFormFields(eraseFields(asset.fields)))
      await axios.post(baseURL, newAsset)
    } else {
      // Update asset fields
      const updatedAsset = getUpdatedAsset(context.current_asset, assetFormFields)
      axios.patch(baseURL + "/" + context.editing_asset_id, updatedAsset)
      updateAssetInCache(queryClient, updatedAsset)
      dispatch(resetCurrentAsset())
      dispatch(setAssetFormFields(eraseFields(asset.fields)))
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
    >
      <div className="flex text-sm [&_span]:w-[220px] items-center">
        <span>Nome do asset:</span>
        <Input
          register={register}
          field="asset_name"
          placeholder="Insira o nome um asset..."
        />
      </div>
      <div className="flex justify-end gap-2">
        {context.editing_asset_id && (
          <Button
            // onClick={handleBackButton}
            bg="green"
            rounded="full"
            _color="white"
            value="Voltar"
          />
        )}
        {(!context.editing_asset_id || isDifferent) && (
          <Button
            type="submit"
            bg="blue"
            rounded="full"
            _color="white"
            value={context.editing_asset_id ? "Atualizar" : "Enviar"}
          />
        )}
      </div>
    </form>
  )
}
