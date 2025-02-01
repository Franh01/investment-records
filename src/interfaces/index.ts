export interface ITransaction {
  [key: string]: string | number
  id: string
  date: string
  amount: number
  type: "buy" | "sell"
  price: number
  comission: number
  ticker: string
}

export interface IStockInformationAtResponse {
  c: number // Current price
  d: number // Change
  dp: number // Percent change
  h: number // High price of the day
  l: number // Low price of the day
  o: number // Open price of the day
  pc: number // Previous close price
  t: number // Time?
}
export interface IStockInformation {
  currentPrice: number // Current price
  dailyChange: number // Change
  dailyChangePercent: number // Percent change
  dailyHigherPrice: number // High price of the day
  dailyLowerPrice: number // Low price of the day
  openPrice: number // Open price of the day
  previousClosePrice: number // Previous close price
  time: number // Time?
  symbol: string
}

export interface IStockInformationResponseConfig {
  url: string
}
export interface IStockInformationResponse {
  data: IStockInformationAtResponse
  config: IStockInformationResponseConfig
  status: number
  statusText: string
}

export interface ITransactionStatistics {
  totalInvestment: number
  unrealizedGains: number
  unrealizedGainsPercentage: number
}
