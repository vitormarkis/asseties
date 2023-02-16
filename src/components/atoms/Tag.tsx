import { baseURL } from "@constants/constants"
import { AssetType, AssetTypeColored } from "@features/asset-slice/types"
import { TagType, TagTypeColored } from "@features/tag-slice/types"
import { NamedColor } from "@myTypes/colorTypes"
import { queryClient } from "@services/queryClient"
import axios from "axios"
import { HTMLAttributes, useState } from "react"

import EditTag from "@components/EditTag"
import { Circle } from "@components/quark/Circle"
import PopoverButton from "@components/quark/PopoverButton"
import * as Dialog from "@radix-ui/react-dialog"
import * as Popover from "@radix-ui/react-popover"
import { AssetObjectReducers as AssetOR } from "@utils/Reducers/AssetsReducers"
import { CacheReducers } from "@utils/Reducers/CacheReducers"

import chroma from "chroma-js"

interface Props extends HTMLAttributes<HTMLDivElement> {
  textColor?: `#${string}` | NamedColor
  tag: TagTypeColored
  asset: AssetTypeColored
  container?: Element | null
  popover?: boolean
  setState?:
    | React.Dispatch<React.SetStateAction<AssetTypeColored>>
    | React.Dispatch<React.SetStateAction<AssetType>>
}

const Tag: React.FC<Props> = props => {
  const { textColor, tag, asset, container, popover, setState, ...rest } = props
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const actionAttributes = {
    edit: {
      title: "Editar a tag",
      description: "Insira as novas informações da tag...",
    },
  }

  const hasInfo = tag.info.length > 0

  function handleDeleteTag(tag: TagType) {
    const assetsWithoutRemovedOne = AssetOR(asset).removeTag(tag.id)
    const refreshedAsset = AssetOR(assetsWithoutRemovedOne).refresh() as AssetTypeColored

    if (queryClient.getQueryData("assets")) {
      CacheReducers(queryClient, "assets").asset().update(refreshedAsset)
    } else {
      throw new Error("Não existe cache para assets!")
    }

    if (setState) setState(refreshedAsset)
    axios.put(baseURL + "/" + refreshedAsset.id, refreshedAsset)
  }

  const tagStyles = {
    hasInfo: {
      // boxShadow: `0 0 0 1px ${chroma(tag.color).brighten(2)}`,
      backgroundColor: `${chroma(tag.color).brighten(2.5)}`,
      color: `${chroma(tag.color).darken(2)}`,
      borderRight: `4px solid ${chroma(tag.color)}`,
      borderWidth: '1px 4px 1px 1px',
      borderColor: `${tag.color}`
    },
    noInfo: {
      backgroundColor: tag.color,
      color: textColor ?? "white",
      // borderRight: hasInfo ? `3px solid ${chroma(tag.color).darken(0.5)}` : "",
    },
  }

  return (
    <Popover.Root
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
    >
      <Popover.Trigger>
        <div
          className={`leading-none py-1  rounded-sm text-xs flex gap-2 items-center
          ${hasInfo ? "tag-has-info pr-2 pl-1" : "px-1"}
          `}
          style={hasInfo ? tagStyles.hasInfo : tagStyles.noInfo}
          {...rest}
        >
          <p>{tag.tag_name}</p>

          <Circle
            onClick={() => handleDeleteTag(tag)}
            style={{
              backgroundColor: `${hasInfo ? tag.color : chroma(tag.color).darken(0.7)}`,
              width: "0.5625rem",
              height: "0.5625rem",
            }}
          />
        </div>
      </Popover.Trigger>
      {popover && (
        <Popover.Portal>
          <Popover.Content
            side="right"
            align="center"
            sticky="always"
            collisionBoundary={container}
            collisionPadding={{ left: 16 }}
            hideWhenDetached={true}
            className="plate py-2 rounded-md bg-slate-800 shadow-md shadow-black/20 flex flex-col text-xs"
          >
            <PopoverButton
              type="button"
              action="Informações"
              element={
                <Dialog.Portal>
                  <Dialog.Overlay className="inset-0 fixed bg-black/40 z-20" />
                  <Dialog.Content className="modal max-w-[90vw] w-[320px] ">
                    <div className="container bg-zinc-200">{tag.info}</div>
                  </Dialog.Content>
                </Dialog.Portal>
              }
            />
            <PopoverButton
              type="button"
              action="Editar"
              element={
                <EditTag
                  actionAttrs={actionAttributes.edit}
                  tag={tag}
                  setIsPopoverOpen={setIsPopoverOpen}
                  asset={asset}
                  setState={setState}
                />
              }
            />
            <PopoverButton
              type="button"
              action="Excluir"
              event={() => handleDeleteTag(tag)}
            />
            <Popover.Arrow
              fill="#1E293B"
              width={4}
              height={4}
            />
            {/* <Popover.Close>XIS</Popover.Close> */}
          </Popover.Content>
        </Popover.Portal>
      )}
    </Popover.Root>
  )
}

export default Tag
