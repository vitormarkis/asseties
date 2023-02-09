import { categories } from "@constants/constants"
import { setOneTagEditField } from "@features/tag-slice"
import { KeyofTagEditFields, TagType } from "@features/tag-slice/types"
import * as Dialog from "@radix-ui/react-dialog"
import React from "react"
import { useDispatch } from "react-redux"
import Button from "./atoms/Button"
import { Input } from "./atoms/Input"
import { Select } from "./atoms/Select"

export interface ActionAttributes {
  title: string
  description: string
}

interface Props {
  actionAttrs: ActionAttributes
  tag: TagType
  handleCloseAutoFocus: () => void
}

const EditTag: React.FC<Props> = ({ actionAttrs, tag, handleCloseAutoFocus }) => {
  const dispatch = useDispatch()

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.currentTarget
    dispatch(setOneTagEditField({ key: name as KeyofTagEditFields, value }))
  }

  return (
    <>
      <Dialog.Overlay className="inset-0 fixed bg-black/20" />

      <Dialog.Content
        onCloseAutoFocus={handleCloseAutoFocus}
        className="
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          text-sm p-4 rounded-lg bg-zinc-100 flex flex-col
          "
      >
        <Dialog.Title className="text-lg text-zinc-600 tracking-wide leading-4 mb-1">
          {actionAttrs.title}
        </Dialog.Title>
        <Dialog.Description className="text-zinc-400 text-xs">{actionAttrs.description}</Dialog.Description>
        <div className="flex flex-col gap-2 my-2">
          <Input
            name="tag_name"
            placeholder="react native"
            onChange={handleOnChangeInput}
            //   value={editFields.tag_name}
            defaultValue={tag.tag_name}
            autoFocus={false}
          />

          <Select
            name="category"
            defaultValue={tag.category}
            options={categories}
          />
        </div>

        <Dialog.Close className="flex items-center justify-between">
          <Button
            onClick={() => console.log("executou")}
            bg="red"
            color="white"
            rounded="md"
            value="Fechar"
            fontSize="extra-small"
          />
          <Button
            onClick={() => console.log("Salvar")}
            bg="green"
            color="white"
            rounded="md"
            value="Salvar"
            fontSize="extra-small"
            autoFocus={true}
          />
        </Dialog.Close>
      </Dialog.Content>
    </>
  )
}

export default EditTag
