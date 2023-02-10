import { categories } from "@constants/constants"
import { setOneTagEditField } from "@features/tag-slice"
import { KeyofTagEditFields, TagEditFields, TagType } from "@features/tag-slice/types"
import * as Dialog from "@radix-ui/react-dialog"
import React, { Dispatch, FormEvent, SetStateAction, useCallback, useRef } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
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
  setIsPopoverOpen: Dispatch<SetStateAction<boolean>>
}

const EditTag: React.FC<Props> = ({ actionAttrs, tag, setIsPopoverOpen }) => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm<TagEditFields>()
  const selectRef = useRef<HTMLSelectElement | null>(null)

  // function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  //   const { name, value } = e.currentTarget
  //   dispatch(setOneTagEditField({ key: name as KeyofTagEditFields, value }))
  // }

  const onSubmit: SubmitHandler<TagEditFields> = (d: any) => {
    setIsPopoverOpen(false)
    console.log(d)
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
            defaultValue={tag.tag_name}
            placeholder="react native"
            // onChange={handleOnChangeInput}
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
                onClick={() => console.log("executou")}
                bg="red"
                color="white"
                rounded="md"
                value="Fechar"
                fontSize="extra-small"
              />
            </Dialog.Close>
            <Button
              type="submit"
              bg="green"
              color="white"
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
