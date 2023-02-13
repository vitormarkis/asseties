import { Button, Input } from "@components/atoms"
import { baseURL } from "@constants/constants"
import { AssetFormFields, AssetType } from "@features/asset-slice/types"
import { queryClient } from "@services/queryClient"
import { AssetObjectReducers as aor } from "@utils/Reducers/AssetsReducers"
import { CacheReducers } from "@utils/Reducers/CacheReducers"
import axios, { AxiosResponse } from "axios"
import _ from "lodash"
import { ChangeEvent, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id as string
  return (await axios.get(baseURL + "/" + id)) as AssetType
}

export function EditAssetForm() {
  const { register, handleSubmit, reset } = useForm<AssetFormFields>()
  const { data: asset } = useLoaderData() as AxiosResponse<AssetType>

  const navigate = useNavigate()

  const [formFields, setFormFields] = useState<AssetFormFields | {}>({})

  const hasDifferences =
    !_.isEqual(formFields, { asset_name: asset.asset_name }) && Object.keys(formFields).length !== 0

  function handleOnChangeField(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormFields(prevState => ({ ...prevState, [name]: value }))
  }

  const onSubmit: SubmitHandler<AssetFormFields> = assetFormFields => {
    const updatedAsset = aor(asset).updateAsset(assetFormFields)
    const refreshedAsset = aor(updatedAsset).refresh()

    CacheReducers(queryClient, "assets").asset().update(refreshedAsset)
    navigate("/")
    axios.put(baseURL + "/" + asset.id, refreshedAsset)
  }

  function handleBackButtonClick() {
    navigate("/")
  }

  useEffect(() => {
    reset()
  }, [])

  return (
    <div className="sm:w-[560px] w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <Input
          field="asset_name"
          name="asset_name"
          register={register}
          defaultValue={asset.asset_name}
          onChange={handleOnChangeField}
        />
        <div className="flex justify-between">
          <Button
            onClick={handleBackButtonClick}
            type="reset"
            value="Voltar"
            color="white"
            rounded="full"
            bg="green"
          />
          {hasDifferences && (
            <Button
              type="submit"
              value="Atualizar"
              color="white"
              rounded="full"
              bg="blue"
            />
          )}
        </div>
      </form>
    </div>
  )
}
