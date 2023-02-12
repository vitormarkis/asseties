import { categories } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { TagEditFields, TagType } from "@features/tag-slice/types"
import * as Dialog from "@radix-ui/react-dialog"
import { FieldsReducers, Formatter } from "@utils/index"
import React, { Dispatch, SetStateAction } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { Button, Input, Select } from "./atoms"

export interface ActionAttributes {
  title: string
  description: string
}

interface Props {
  actionAttrs: ActionAttributes
  tag: TagType
  setIsPopoverOpen: Dispatch<SetStateAction<boolean>>
  _asset: AssetType
}

const EditTag: React.FC<Props> = ({ actionAttrs, tag, _asset, setIsPopoverOpen }) => {
  const { register, handleSubmit } = useForm<TagEditFields>()
  // const { current_tag } = useAppSelector(state => state.context)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const onSubmit: SubmitHandler<TagEditFields> = async formTag => {
    // const formattedFields = formatFields<TagFormFields>(formTag)
    /**
     *  USAR REDUCERS
     */
    // const updatedAsset = getUpdatedAssetByUpdatingTag(formattedFields, tag.id, _asset)
    const foo = FieldsReducers(formTag).formatFields(Formatter.fields)
    console.log(foo)
    // await axios.put(`${baseURL}/${_asset.id}`, updatedAsset)
    // updateAssetInCache(queryClient, updatedAsset)
    // dispatch(setCurrentAsset(updatedAsset))
    // setIsPopoverOpen(false)
  }

  return (
    <>
      <Dialog.Overlay className="inset-0 fixed bg-black/20" />

      <Dialog.Content
        onCloseAutoFocus={() => setIsPopoverOpen(false)}
        className="
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          text-sm p-4 rounded-lg bg-zinc-100 flex flex-col
          "
      >
        <Dialog.Title className="text-lg text-zinc-600 tracking-wide leading-4 mb-1">{actionAttrs.title}</Dialog.Title>
        <Dialog.Description className="text-zinc-400 text-xs">{actionAttrs.description}</Dialog.Description>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 my-2"
        >
          <Input
            register={register}
            field="tag_name"
            defaultValue={tag.tag_name}
            placeholder="react native"
          />

          <Select
            register={register}
            field="category"
            defaultValue={tag.category}
            options={categories}
          />

          <div className="flex items-center justify-between">
            <Dialog.Close>
              <Button
                onClick={() => {}}
                bg="red"
                _color="white"
                rounded="md"
                value="Fechar"
                fontSize="extra-small"
              />
            </Dialog.Close>
            <Button
              type="submit"
              bg="green"
              _color="white"
              rounded="md"
              value="Salvar"
              fontSize="extra-small"
              autoFocus={true}
            />
          </div>
        </form>
      </Dialog.Content>
    </>
  )
}

export default EditTag
