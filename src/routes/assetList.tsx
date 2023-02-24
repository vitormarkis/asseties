import { Sort } from "@assets/icons"
import AssetListCompact from "@components/AssetListCompact"
import AssetListDetailed from "@components/AssetListDetailed"
import { FormFieldBox } from "@components/atoms"
import { ContainerOption } from "@components/quark/ContainerOption"
import { ContainerOptionOverlay } from "@components/quark/ContainerOptionOverlay"
import { IconHover } from "@components/Wrappers/IconHover"
import { MainWrapper } from "@components/Wrappers/MainWrapper"
import { baseURL, sortingOptions, tagCollorPallete } from "@constants/constants"
import { AssetType, AssetTypeColored } from "@features/asset-slice/types"
import {
  setFilteredListSearchField,
  setFilteredListSortingBy,
  setFilteredListSortState,
} from "@features/filterList-slice"
import { SortingAssetProps } from "@features/filterList-slice/types"
import { useAppSelector } from "@features/store"
import { useQuery } from "@tanstack/react-query"
import { filterMethod, sortMethod } from "@utils/index"
import { AssetsArrayReducers as AssetsAR } from "@utils/Reducers/AssetsReducers"
import axios from "axios"
import { ChangeEvent } from "react"
import { useDispatch } from "react-redux"
import StickyBox from "react-sticky-box"

export interface AssetListProps {
  assets: AssetTypeColored[]
  searchedAssets: AssetTypeColored[]
  filteredAssets: AssetTypeColored[]
}

interface Props {
  toolbar?: boolean
}

export const AssetList: React.FC<Props> = ({ toolbar }) => {
  const { data: assets, isLoading } = useQuery<AssetType[]>(
    ["assets"],
    async () => {
      const res = await axios.get(baseURL)
      return res.data
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  )

  const coloredAssets: AssetTypeColored[] = AssetsAR(assets!).colorize(tagCollorPallete)

  const dispatch = useDispatch()
  const { filteredList, context } = useAppSelector(state => state)
  const { fields, sortState, sortingBy } = filteredList
  const { current_asset_list_container: current } = context

  if (isLoading || !coloredAssets) {
    return (
      <div className="flex justify-center p-3">
        <p>Loading...</p>
      </div>
    )
  }

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch(setFilteredListSearchField(value))
  }

  function handleSortClick() {
    dispatch(setFilteredListSortState())
  }

  const searchedAssets: AssetTypeColored[] = [...coloredAssets!]
    .sort(sortMethod(sortState, sortingBy))
    .filter(filterMethod(fields.searchField))!

  const filteredAssets: AssetTypeColored[] = [...coloredAssets!].sort(sortMethod(sortState, sortingBy))

  // useEffect(() => {
  //   if (fields.searchField.length === 0) {
  //     dispatch(setFilteredListSortState(0))
  //   }
  // }, [fields.searchField])

  return (
    <div className="sm:w-[560px] w-full flex flex-col gap-4">
      {toolbar && (
        <MainWrapper className="h-16 gap-4 flex justify-between sm:rounded-lg">
          <div className="grow">
            <FormFieldBox>
              <input
                autoComplete="off"
                onChange={handleOnChangeInput}
                value={fields.searchField}
                type="text"
                placeholder="system-tags..."
                className="w-full"
              />
            </FormFieldBox>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col items-center justify-center">
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
              <select
                onChange={e => dispatch(setFilteredListSortingBy(e.currentTarget.value as SortingAssetProps))}
              >
                {sortingOptions.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </MainWrapper>
      )}
      
      <StickyBox className="z-[15]">
        <MainWrapper
          className="h-[32px] sm:rounded-lg relative transition-all duration-700 "
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

      {coloredAssets && current === "details" ? (
        <AssetListDetailed
          assets={coloredAssets}
          filteredAssets={filteredAssets}
          searchedAssets={searchedAssets}
        />
      ) : coloredAssets && current === "compact" ? (
        <AssetListCompact
          assets={coloredAssets}
          filteredAssets={filteredAssets}
          searchedAssets={searchedAssets}
        />
      ) : null}
    </div>
  )
}
