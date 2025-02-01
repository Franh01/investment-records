import type {
  IStockInformation,
  IStockInformationResponse,
} from "@interfaces/index"

import axios from "axios"
import { getSymbolByUrl } from "@helpers/getSymbolFromUrl"

const getUrlsToFetch = (symbols: string[]) => {
  const urls: Promise<IStockInformationResponse>[] = []

  symbols.forEach(symbol => {
    urls.push(
      axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cueks2hr01qkqnpfesmgcueks2hr01qkqnpfesn0`,
      ),
    )
  })

  return urls
}
export const getStockInformationBySymbols = async (
  symbols: string[],
): Promise<IStockInformation[]> => {
  const urls = getUrlsToFetch(symbols)

  const response = await Promise.all(urls).then(responses => {
    const symbolInformation = responses.map(response => {
      return {
        currentPrice: response.data.c,
        dailyChange: response.data.d,
        dailyChangePercent: response.data.dp,
        dailyHigherPrice: response.data.h,
        dailyLowerPrice: response.data.l,
        openPrice: response.data.o,
        previousClosePrice: response.data.pc,
        time: response.data.t,
        symbol: getSymbolByUrl(response.config.url),
      }
    })
    return symbolInformation
  })

  return response
}
