import { Button, Input } from "@components/atoms"
import { baseURL } from "@constants/constants"
import { AssetFormFields } from "@features/asset-slice/types"
import { queryClient } from "@services/queryClient"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { addNewAssetToCache, generateNewAsset } from "../utils"

export function NewAssetForm() {
  const { register, handleSubmit } = useForm<AssetFormFields>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<AssetFormFields> = async assetFormData => {
    const newAsset = generateNewAsset(assetFormData)
    await axios.post(`${baseURL}`, newAsset)
    addNewAssetToCache(newAsset, queryClient)
    navigate("/")
  }

  function handleBackButtonClick() {
    navigate(-1)
  }

  return (
    <div className="w-[480px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <Input
          field="asset_name"
          register={register}
          placeholder="system-tags-with-react"
        />

        <div className="flex justify-between">
          <Button
            onClick={handleBackButtonClick}
            type="reset"
            bg="green"
            value="Voltar"
            _color="white"
            rounded="full"
          />
          <Button
            type="submit"
            bg="blue"
            value="Enviar"
            _color="white"
            rounded="full"
          />
        </div>
      </form>
    </div>
  )
}
