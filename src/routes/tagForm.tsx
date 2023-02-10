import { Button, Input, Select, Tag } from "@components/atoms"
import { baseURL, categories } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { useAppSelector } from "@features/store"
import { setTagFormFields } from "@features/tag-slice"
import { TagFormFields } from "@features/tag-slice/types"
import { addNewTagInCache, eraseFields, generateNewTag, updateAssetInCache } from "@utils/index"
import axios from "axios"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { useHref, useLocation, useNavigate } from "react-router-dom"

export default function TagsForm() {
  const { state: { asset: rawAsset } } = useLocation() as { state: { asset: AssetType } }
  const [asset, setAsset] = useState<AssetType>(rawAsset)
  const navigate = useNavigate()
  const { formFields: tagFields } = useAppSelector(state => state.tag)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<TagFormFields>()

  function handleBackClick() {
    navigate(-1)
    dispatch(setTagFormFields(eraseFields(tagFields)))
  }

  const onSubmit: SubmitHandler<TagFormFields> = (formData: TagFormFields) => {
    console.log('Chegou')
    const updatedAt = { updated_at: String(new Date()) }
    const newTag = generateNewTag(formData, updatedAt)
    const updatedTagArray = [...asset.tags, newTag]
    const updatedAsset = { ...updatedAt, tags: updatedTagArray }
    // console.log({updatedAsset})
    
    setAsset(prevAsset => ({ ...prevAsset, ...updatedAsset }))
    updateAssetInCache(asset.id, queryClient, { ...asset, ...updatedAsset })
    axios.patch(baseURL + "/" + asset.id, updatedAsset)
    // dispatch(setTagFormFields(eraseFields(tagFields)))
  }

  useEffect(() => {
    console.log(asset)
  }, [asset]);
  
  useEffect(() => {
    reset()
  }, [isSubmitSuccessful, reset])

  return (
    <div className="flex flex-col items-center p-12 bg-zinc-100 h-screen gap-12">
      <div className=" w-[560px]">
        <div className="flex items-center justify-between">
          <h1 className="text-lg drop-shadow-md">{asset.asset_name}</h1>
        </div>
        <p className="text-zinc-400 text-xs">{asset.created_at}</p>
        <div className="my-2 flex gap-2 flex-wrap">
          {asset.tags.map(tag => (
            <Tag
              _bg="blueviolet"
              _color="white"
              _assetId={rawAsset.id}
              _tag={tag}
              _popover
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
            onClick={handleBackClick}
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
