import { Button, FormFieldBox, Input, Tag } from "@components/atoms"
import { baseURL, tagCategories, tagCollorPallete } from "@constants/constants"
import { AssetType, AssetTypeColored } from "@features/asset-slice/types"
import { TagFormFields } from "@features/tag-slice/types"
import { queryClient } from "@services/queryClient"
import { FieldsReducers, Formatter } from "@utils/index"
import { AssetObjectReducers as aor, AssetObjectReducers } from "@utils/Reducers/AssetsReducers"
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
  const { register, handleSubmit, reset } = useForm<TagFormFields>()
  const coloredAsset = AssetObjectReducers(rawAsset).colorize(tagCollorPallete)
  const [asset, setAsset] = useState<AssetTypeColored>(coloredAsset)

  async function handleBackButton() {
    navigate(-1)
  }

  useEffect(() => {
    setAsset(uncoloredAsset => AssetObjectReducers(uncoloredAsset).colorize(tagCollorPallete))
  }, [])

  const onSubmit: SubmitHandler<TagFormFields> = (tagFormFields: TagFormFields) => {
    const formattedFields = FieldsReducers(tagFormFields).formatFields(Formatter.fields)
    const newTag = TagObjectReducers().createTag(formattedFields)
    const coloredTag = TagObjectReducers(newTag).colorize(tagCollorPallete)
    const updatedAsset = aor(asset).addTag(coloredTag)
    const refreshedAsset = aor(updatedAsset).refresh() as AssetTypeColored
    const dryAsset = aor(refreshedAsset).dryTags()

    console.log({tagFormFields, newTag, coloredTag, updatedAsset, refreshedAsset, dryAsset})
    
    setAsset(refreshedAsset)
    CacheReducers(queryClient, "assets").asset().update(refreshedAsset)
    axios.put(baseURL + "/" + asset.id, dryAsset)

    reset({ tag_name: "", info: "" })
  }

  return (
    <div className="flex flex-col items-center bg-zinc-100 min-h-screen gap-12">
      <div className="sm:w-[560px] w-full flex flex-col justify-center p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg drop-shadow-md">{asset?.asset_name}</h1>
        </div>
        <p className="text-zinc-400 text-xs">{asset?.created_at}</p>
        <div className="my-2 flex gap-2 flex-wrap">
          {asset?.tags.map(tag => (
            <Tag
              key={tag.id}
              textColor="white"
              tag={tag}
              asset={asset}
              popover
              setState={setAsset}
            />
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-[560px] w-full px-4 flex [&_span]:w-[110px] flex-col gap-3"
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
          <FormFieldBox>
            <select
              className="w-full"
              {...register("category")}
            >
              {tagCategories.map(tagCat => (
                <option
                  key={tagCat.value}
                  value={tagCat.value}
                >
                  {tagCat.label}
                </option>
              ))}
            </select>
          </FormFieldBox>
        </div>
        <div className="flex text-sm items-start">
          <span>Information:</span>
          <FormFieldBox>
            <textarea
              {...register("info")}
              className="w-full"
              rows={7}
            ></textarea>
          </FormFieldBox>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={handleBackButton}
            type="button"
            bg="green"
            textColor="white"
            rounded="full"
            value="Voltar"
          />
          <Button
            type="submit"
            bg="blue"
            textColor="white"
            rounded="full"
            value="Enviar"
          />
        </div>
      </form>
    </div>
  )
}
