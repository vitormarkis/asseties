import { Button, Input } from "@components/atoms"
import { baseURL } from "@constants/constants"
import { AssetFormFields } from "@features/asset-slice/types"
import { queryClient } from "@services/queryClient"
import { AssetObjectReducers as aor } from "@utils/Reducers/AssetsReducers"
import { CacheReducers } from "@utils/Reducers/CacheReducers"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export function NewAssetForm() {
  const { register, handleSubmit } = useForm<AssetFormFields>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<AssetFormFields> = assetFormFields => {
    const newAsset = aor().createAsset(assetFormFields)
    CacheReducers(queryClient, "assets").asset().add(newAsset)
    axios.post(baseURL, newAsset)
    navigate("/")
  }

  function handleBackButtonClick() {
    navigate(-1)
  }

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 grow"
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
            color="white"
            rounded="full"
          />
          <Button
            type="submit"
            bg="blue"
            value="Enviar"
            color="white"
            rounded="full"
          />
        </div>
      </form>
  )
}
