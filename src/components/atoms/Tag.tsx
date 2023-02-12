import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { TagType } from "@features/tag-slice/types"
import { NamedColor } from "@myTypes/colorTypes"
import { queryClient } from "@services/queryClient"
import axios from "axios"
import { HTMLAttributes, useState } from "react"

import EditTag from "@components/EditTag"
import PopoverButton from "@components/quark/PopoverButton"
import * as Popover from "@radix-ui/react-popover"
import { AssetObjectReducers } from "@utils/Reducers/AssetsReducers"
import { CacheReducers } from "@utils/Reducers/CacheReducers"

interface Props extends HTMLAttributes<HTMLDivElement> {
  _bg?: `#${string}` | NamedColor
  _color?: `#${string}` | NamedColor
  _tag: TagType
  _asset: AssetType
  _container?: Element | null
  _popover?: boolean
  setState: React.Dispatch<React.SetStateAction<AssetType>>
}

const Tag: React.FC<Props> = props => {
  const { _bg, _color, _tag, _asset, _container, _popover, setState, ...rest } = props
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const actionAttributes = {
    edit: {
      title: "Editar a tag",
      description: "Insira as novas informações da tag...",
    },
  }

  function handleDeleteTag(tag: TagType) {
    const assetsWithoutRemovedOne = AssetObjectReducers(_asset).removeTag(tag.id)
    const refreshedAsset = AssetObjectReducers(assetsWithoutRemovedOne).refresh()

    if(queryClient.getQueryData('assets')) {
      CacheReducers(queryClient, 'assets').asset().update(refreshedAsset)
    }
    
    setState(refreshedAsset)
    axios.put(baseURL + "/" + refreshedAsset.id, refreshedAsset)
  }

  function handleClickDownOutside() {}

  return (
    <Popover.Root
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
    >
      <Popover.Trigger>
        <div
          className="leading-none p-1 rounded-sm text-xs flex gap-2 items-center"
          style={{
            backgroundColor: _bg ?? "#52525B",
            color: _color ?? "#fff",
          }}
          {...rest}
        >
          <p>{_tag.tag_name}</p>
          <p
            onClick={() => handleDeleteTag(_tag)}
            className="cursor-pointer p-1 rounded-full bg-black/20 mr-1 w-2.5 h-2.5"
          />
        </div>
      </Popover.Trigger>
      {_popover && (
        <Popover.Portal>
          <Popover.Content
            onPointerDownOutside={handleClickDownOutside}
            side="right"
            align="center"
            sticky="always"
            collisionBoundary={_container}
            collisionPadding={{ left: 16 }}
            hideWhenDetached={true}
            className="plate py-2 rounded-md bg-slate-800 shadow-md shadow-black/20 flex flex-col text-xs"
          >
            <PopoverButton
              type="button"
              action="Excluir"
              event={() => handleDeleteTag(_tag)}
            />
            <PopoverButton
              type="button"
              action="Editar"
              event={() => {}}
              element={
                <EditTag
                  actionAttrs={actionAttributes.edit}
                  tag={_tag}
                  setIsPopoverOpen={setIsPopoverOpen}
                  _asset={_asset}
                  setState={setState}
                />
              }
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
