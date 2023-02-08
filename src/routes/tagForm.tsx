import Button from "@components/atoms/Button"
import { Input } from "@components/atoms/Input"
import { baseURL, categories } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { useAppSelector } from "@features/store"
import { setOneTagFormField, setTagFormFields } from "@features/tag-slice"
import { KeyofTagFormFields, TagType } from "@features/tag-slice/types"
import { addNewTagInCache, eraseFields, generateNewTag, removeTag } from "@utils/index"
import axios from "axios"
import { useState } from "react"
import { useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

export default function TagsForm() {
  const { state } = useLocation()
  const { asset: rawAsset } = state as { asset: AssetType }
  const [asset, setAsset] = useState<AssetType>(rawAsset)
  const navigate = useNavigate()
  const { fields: tagFields } = useAppSelector((state) => state.tag)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.currentTarget
    dispatch(setOneTagFormField({ key: name as KeyofTagFormFields, value }))
  }

  async function handleSendClick() {
    const newTag = generateNewTag(tagFields)
    const updatedTagArray = { tags: [...asset.tags, newTag] }
    const updated_at = String(new Date())
    const updatedAsset = { ...updatedTagArray, updated_at }
    setAsset((prevAsset) => ({ ...prevAsset, ...updatedAsset }))

    addNewTagInCache(asset.id, newTag, queryClient)
    // setAsset(asset)

    axios.patch(baseURL + "/" + asset.id, updatedAsset)

    // await queryClient.invalidateQueries("fruits")
    dispatch(setTagFormFields(eraseFields(tagFields)))
  }

  function handleDeleteTag(assetId: string, tag: TagType) {
    const { id: tagId } = tag
    const assetsInCache = queryClient.getQueryData<AssetType[]>("assets")!
    const { assets, asset } = removeTag(assetId, tagId, assetsInCache)!
    setAsset(asset)

    queryClient.invalidateQueries("assets")
    queryClient.setQueryData("assets", assets)

    axios.put(`${baseURL}/${assetId}`, asset)
  }

  function handleBackClick() {
    navigate(-1)
    dispatch(setTagFormFields(eraseFields(tagFields)))
  }

  return (
    <div className="flex flex-col items-center p-12 bg-zinc-100 h-screen gap-12">
      <div className=" w-[560px]">
        <div className="flex items-center justify-between">
          <h1 className="text-lg drop-shadow-md">{asset.asset_name}</h1>
        </div>
        <p className="text-zinc-400 text-xs">{asset.created_at}</p>
        <div className="my-2 flex gap-2 flex-wrap">
          {asset.tags.map((tag) => (
            <div
              className="leading-none p-1 rounded-sm bg-zinc-600 text-xs text-white flex gap-2 items-center"
              key={tag.id}>
              <p>{tag.tag_name}</p>
              <p
                onClick={() => handleDeleteTag(asset.id, tag)}
                className="cursor-pointer p-1 rounded-full bg-zinc-700 mr-1 w-2.5 h-2.5"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-[480px] flex [&_span]:w-[110px] flex-col gap-3">
        <div className="flex text-sm items-center">
          <span>Tag name:</span>
          <Input
            name="tag_name"
            placeholder="Vermelha"
            value={tagFields.tag_name}
            onChange={handleOnChangeInput}
          />
        </div>
        <div className="flex text-sm items-center">
          <span>Category:</span>
          <select
            name="category"
            className="grow py-1 px-3 rounded-sm shadow-sh"
            value={tagFields.category}
            onChange={handleOnChangeInput}
            placeholder="8.7">
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={handleBackClick}
            bg="green"
            color="white"
            rounded="full"
            value="Voltar"
          />
          <Button
            onClick={handleSendClick}
            bg="blue"
            color="white"
            rounded="full"
            value="Enviar"
          />
        </div>
      </div>
    </div>
  )
}
