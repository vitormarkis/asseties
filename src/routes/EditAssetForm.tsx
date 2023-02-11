import { Button, Input } from "@components/atoms"
import { baseURL } from "@constants/constants"
import { AssetFormFields, AssetType } from "@features/asset-slice/types"
import { queryClient } from "@services/queryClient"
import { getUpdatedAsset, updateAssetInCache } from "@utils/index"
import axios, { AxiosResponse } from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id as string
  return (await axios.get(baseURL + "/" + id)) as AssetType
}

export function EditAssetForm() {
  const { register, handleSubmit } = useForm<AssetFormFields>()
  const {
    data: asset,
  } = useLoaderData() as AxiosResponse<AssetType>
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<AssetFormFields> = async assetFormFields => {
    const updatedAsset = getUpdatedAsset(asset, assetFormFields)
    await axios.put(baseURL + '/' + asset.id, updatedAsset)
    updateAssetInCache(queryClient, updatedAsset)
    navigate('/')
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
          defaultValue={asset.asset_name}
        />
        <div className="flex justify-between">
          <Button
          onClick={handleBackButtonClick}
            type="reset"
            value="Voltar"
            _color="white"
            rounded="full"
            bg="green"
          />
          <Button
            type="submit"
            value="Atualizar"
            _color="white"
            rounded="full"
            bg="blue"
          />
        </div>
      </form>
    </div>
  )
}
