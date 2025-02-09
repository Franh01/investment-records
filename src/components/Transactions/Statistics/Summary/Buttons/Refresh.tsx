import {
  getAllStocksInformation,
  selectStockInformationsStatus,
} from "@components/StockInformation/stockInformationSlice"
import { useAppDispatch, useAppSelector } from "@app/hooks"

import SimpleButton from "@components/common/SimpleButton/SimpleButton"
import useViewportSize from "@hooks/useViewportSize"

const Refresh = () => {
  const { isMobile } = useViewportSize()
  const refreshingStatus = useAppSelector(selectStockInformationsStatus)
  const dispatch = useAppDispatch()
  return (
    <SimpleButton
      text="Refrescar"
      onClick={() => dispatch(getAllStocksInformation())}
      loading={refreshingStatus === "loading"}
      width={isMobile ? "auto" : "full"}
    />
  )
}

export default Refresh
