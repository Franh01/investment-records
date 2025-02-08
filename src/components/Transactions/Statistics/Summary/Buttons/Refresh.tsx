import {
  getAllStocksInformation,
  selectStockInformationsStatus,
} from "@components/StockInformation/stockInformationSlice"
import { useAppDispatch, useAppSelector } from "@app/hooks"

import SimpleButton from "@components/common/SimpleButton/SimpleButton"

const Refresh = () => {
  const refreshingStatus = useAppSelector(selectStockInformationsStatus)
  const dispatch = useAppDispatch()
  return (
    <SimpleButton
      text="Refrescar"
      onClick={() => dispatch(getAllStocksInformation())}
      loading={refreshingStatus === "loading"}
    />
  )
}

export default Refresh
