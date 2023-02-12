import { Button, Input, Select, Tag } from "@components/atoms"
import { baseURL, categories } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { resetCurrentAsset } from "@features/context-slice"
import { TagFormFields } from "@features/tag-slice/types"
import { queryClient } from "@services/queryClient"
import { FieldsReducers, Formatter } from "@utils/index"
import { AssetObjectReducers as aor } from "@utils/Reducers/AssetsReducers"
import { CacheReducers } from "@utils/Reducers/CacheReducers"
import { TagObjectReducers } from "@utils/Reducers/TagsReducers"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id
  return await axios.get(baseURL + "/" + id)
}

export default function TagsForm() {
  const navigate = useNavigate()
  const { data: rawAsset } = useLoaderData() as AxiosResponse<AssetType>
  const { register, handleSubmit, reset, formState } = useForm<TagFormFields>()
  const { isSubmitSuccessful } = formState
  const [asset, setAsset] = useState(rawAsset);

  async function handleBackButton() {
    navigate(-1)
  }

  const onSubmit: SubmitHandler<TagFormFields> = (tagFormFields: TagFormFields) => {
    const formattedFields = FieldsReducers(tagFormFields).formatFields(Formatter.fields)
    const newTag = TagObjectReducers().createTag(formattedFields)
    const updatedAsset = aor(asset).addTag(newTag)
    const refreshedAsset = aor(updatedAsset).refresh()
    
    setAsset(refreshedAsset)
    CacheReducers(queryClient, 'assets').asset().update(refreshedAsset)
    axios.put(baseURL + "/" + asset.id, refreshedAsset)
  }

  useEffect(() => {
    reset()
  }, [isSubmitSuccessful, reset])

  return (
    <div className="flex flex-col items-center p-12 bg-zinc-100 h-screen gap-12">
      <div className=" w-[560px]">
        <div className="flex items-center justify-between">
          <h1 className="text-lg drop-shadow-md">{asset?.asset_name}</h1>
        </div>
        <p className="text-zinc-400 text-xs">{asset?.created_at}</p>
        <div className="my-2 flex gap-2 flex-wrap">
          {asset?.tags.map(tag => (
            <Tag
              key={tag.id}
              _bg="blueviolet"
              _color="white"
              _tag={tag}
              _asset={asset}
              _popover
              setState={setAsset}
            />
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[480px] flex [&_span]:w-[110px] flex-col gap-3"
      >
        <div className="flex text-sm items-center">
          <span>Tag name:</span>
          <Input
            placeholder="Vermelha"
            register={register}
            field="tag_name"
          />
        </div>
        <div className="flex text-sm items-center">
          <span>Category:</span>
          <Select
            field="category"
            options={categories}
            register={register}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={handleBackButton}
            type="button"
            bg="green"
            _color="white"
            rounded="full"
            value="Voltar"
          />
          <Button
            type="submit"
            bg="blue"
            _color="white"
            rounded="full"
            value="Enviar"
          />
        </div>
      </form>
    </div>
  )
}
