import { Sort } from "@assets/icons"
import AssetListCompact from "@components/AssetListCompact"
import AssetListDetailed from "@components/AssetListDetailed"
import { FormFieldBox } from "@components/atoms"
import { ContainerOption } from "@components/quark/ContainerOption"
import { ContainerOptionOverlay } from "@components/quark/ContainerOptionOverlay"
import { IconHover } from "@components/Wrappers/IconHover"
import { MainWrapper } from "@components/Wrappers/MainWrapper"
import { baseURL } from "@constants/constants"
import { AssetType } from "@features/asset-slice/types"
import { setFilteredList, setFilteredListSearchField, setFilteredListSortState } from "@features/filterList-slice"
import { useAppSelector } from "@features/store"
import axios from "axios"
import { ChangeEvent } from "react"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"
import StickyBox from "react-sticky-box"

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
  const { filteredList, context } = useAppSelector(state => state)
  const { fields, sortState } = filteredList
  const { current_asset_list_container: current } = context

  function updateFilteredList() {
    const filteredAssets = [...assets!].filter(asset => asset.asset_name.includes(fields.searchField))!

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

  // useEffect(() => {
  //   if (fields.searchField.length === 0) {
  //     dispatch(setFilteredListSortState(false))
  //   }
  // }, [fields.searchField])

  return (
    <div className="sm:w-[560px] w-full flex flex-col gap-4">
      {toolbar && (
        <MainWrapper className="h-16 gap-4 flex justify-between sm:rounded-lg">
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

      <StickyBox className="z-10">
        <MainWrapper
          className="h-[32px] sm:rounded-lg relative transition-all duration-700 border-y border-purple-400"
          style={{ padding: "0px" }}
        >
          <ContainerOption
            data_id="details"
            title="Detalhes"
          />
          <ContainerOption
            data_id="compact"
            title="Compacto"
          />
          <ContainerOptionOverlay className="bg-purple-600" />
        </MainWrapper>
      </StickyBox>

      {assets && current === "details" ? (
        <AssetListDetailed assets={assets} />
      ) : assets && current === "compact" ? (
        <AssetListCompact assets={assets} />
      ) : null}
    </div>
  )
}
