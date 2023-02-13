import { Sort } from "@assets/icons"
import { Asset } from "@components/Asset"
import { FormFieldBox } from "@components/atoms"
import { IconHover } from "@components/Wrappers/IconHover"
import { MainWrapper } from "@components/Wrappers/MainWrapper"
import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { setFilteredList, setFilteredListSearchField, setFilteredListSortState } from "@features/filterList-slice"
import { useAppSelector } from "@features/store"
import axios from "axios"
import { ChangeEvent, useEffect } from "react"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"

interface Props {
  toolbar?: boolean
}

export const AssetList: React.FC<Props> = ({ toolbar }) => {
  const {
    data: assets,
    isLoading,
    isError,
  } = useQuery<AssetType[]>(
    "assets",
    async () => {
      const res = await axios.get(baseURL)
      return res.data
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  )

  const dispatch = useDispatch()
  const { filteredList, fields, sortState } = useAppSelector(state => state.filteredList)

  function updateFilteredList() {
    const filteredAssets = [...assets!].filter(asset => asset.asset_name.includes(fields.searchField))!

    // const sortedList = [...filteredAssets].sort((a, b) => {
    //   return a.asset_name > b.asset_name
    //     ? sortState ? 1 : -1
    //     : a.asset_name < b.asset_name
    //     ? sortState ? -1 : 1
    //     : 0
    // })

    // console.log(sortedList)
    dispatch(setFilteredList(filteredAssets))
  }

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch(setFilteredListSearchField(value))

    updateFilteredList()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-3">
        <p>Loading...</p>
      </div>
    )
  }

  function handleSortClick() {
    dispatch(setFilteredListSortState())
    updateFilteredList()
  }

  const searchedAssets = [...assets!]
    .sort((a, b) =>
      a.asset_name > b.asset_name ? (sortState ? 1 : -1) : a.asset_name < b.asset_name ? (sortState ? -1 : 1) : 0
    )
    .filter(asset => asset.asset_name.includes(fields.searchField))!

  const filteredAssets = [...assets!].sort((a, b) =>
    a.asset_name > b.asset_name ? (sortState ? 1 : -1) : a.asset_name < b.asset_name ? (sortState ? -1 : 1) : 0
  )

  // useEffect(() => {
  //   if (fields.searchField.length === 0) {
  //     dispatch(setFilteredListSortState(false))
  //   }
  // }, [fields.searchField])

  return (
    <div className="sm:w-[560px] w-full">
      {toolbar && (
        <MainWrapper className="h-16 gap-4 mb-4 flex justify-between sm:rounded-lg">
          <div className="grow">
            <FormFieldBox>
              <input
                onChange={handleOnChangeInput}
                value={fields.searchField}
                type="text"
                placeholder="system-tags..."
                className="w-full"
              />
            </FormFieldBox>
          </div>
          <div className="flex gap-2">
            <IconHover
              className="transition-all duration-500"
              onClick={handleSortClick}
              active={sortState}
            >
              <Sort
                className="cursor-pointer"
                width={20}
                color={"#020202"}
              />
            </IconHover>
          </div>
        </MainWrapper>
      )}
      <MainWrapper
        // ref={setContainer}
        className="grow overflow-y-scroll flex-col sm:rounded-lg scroll-style"
      >
        {fields.searchField.length > 0
          ? searchedAssets?.map(asset => (
              <Asset
                key={asset.id}
                // container={container}
                asset={asset}
              />
            ))
          : sortState
          ? filteredAssets?.map(asset => (
              <Asset
                key={asset.id}
                // container={container}
                asset={asset}
              />
            ))
          : assets?.map(asset => (
              <Asset
                key={asset.id}
                // container={container}
                asset={asset}
              />
            ))}
      </MainWrapper>
    </div>
  )
}
