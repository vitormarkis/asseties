import { baseURL, sortingOptions, tagCategories, tagCollorPallete } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { TagCategoryObject, TagEditFields, TagType } from "@features/tag-slice/types"
import * as Dialog from "@radix-ui/react-dialog"
import { queryClient } from "@services/queryClient"
import { AssetObjectReducers as AssetOR } from "@utils/Reducers/AssetsReducers"
import { CacheReducers } from "@utils/Reducers/CacheReducers"
import { TagObjectReducers as TagOR } from "@utils/Reducers/TagsReducers"
import axios from "axios"
import React, { Dispatch, SetStateAction, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button, FormFieldBox, Input } from "./atoms"

export interface ActionAttributes {
  title: string
  description: string
}

interface Props {
  actionAttrs: ActionAttributes
  tag: TagType
  asset: AssetType
  setIsPopoverOpen: Dispatch<SetStateAction<boolean>>
  setState?: React.Dispatch<React.SetStateAction<AssetType>>
}

function EditTag({ actionAttrs, tag, asset, setState, setIsPopoverOpen }: Props) {
  const { register, handleSubmit, reset } = useForm<TagEditFields>()

  // const tagCategory = sortingOptions.find((option): string =>
  //   option.value === tag.category ? option.label : ""
  // )

  const onSubmit: SubmitHandler<TagEditFields> = tagFormFields => {
    // const formattedTagFormFields = FieldsReducers(tagFormFields).formatFields(Formatter.fields)
    // const updatedTag = TagOR(tag).updateTag(formattedTagFormFields)
    const updatedTag = TagOR(tag).updateTag(tagFormFields)
    const refreshedTag = TagOR(updatedTag).refresh()
    const coloredTag = TagOR(refreshedTag).colorize(tagCollorPallete)
    const updatedAsset = AssetOR(asset).updateTag(coloredTag)
    const refreshedAsset = AssetOR(updatedAsset).refresh()
    const rawAsset = AssetOR(refreshedAsset).dryTags()

    if (setState) setState(refreshedAsset)
    CacheReducers(queryClient, "assets").asset().update(refreshedAsset)
    axios.put(baseURL + "/" + rawAsset.id, rawAsset)
    setIsPopoverOpen(false)
  }

  useEffect(() => {
    reset({ category: tag.category, tag_name: tag.tag_name })
  }, [])

  // function findCategoryLabel(tagCategory: string, tagCategories: TagCategoryObject[]): string {
  //   const { label } = tagCategories.find(tagCat => tagCat.value === tagCategory) ?? {}
  //   if (!label) throw new Error("Não foi encontrado um value correspondente ao Tag Category informado.")
  //   return label
  // }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="inset-0 fixed bg-black/20" />

      <Dialog.Content
        onCloseAutoFocus={() => setIsPopoverOpen(false)}
        className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm p-4 rounded-lg bg-zinc-200 flex flex-col z-20 "
      >
        <Dialog.Title className="text-lg text-zinc-600 tracking-wide leading-4 mb-1">
          {actionAttrs.title}
        </Dialog.Title>
        <Dialog.Description className="text-zinc-400 text-xs">{actionAttrs.description}</Dialog.Description>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 my-2"
        >
          <Input
            register={register}
            field="tag_name"
            placeholder="react native"
          />

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

          <div className="flex items-center justify-between gap-2">
            <Button
              onClick={() => setIsPopoverOpen(false)}
              bg="red"
              textColor="white"
              rounded="md"
              value="Fechar"
              fontSize="extra-small"
            />
            <Button
              type="submit"
              bg="green"
              textColor="white"
              rounded="md"
              value="Salvar"
              fontSize="extra-small"
              autoFocus={true}
            />
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default EditTag
