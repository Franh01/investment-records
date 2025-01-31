export const getSymbolByUrl = (url: string): string => {
  //"https://finnhub.io/api/v1/quote?symbol=YPF&token=cueks2hr01qkqnpfesmgcueks2hr01qkqnpfesn0"

  const part1 = url.split("?")[1] // "symbol=YPF&token=cueks2hr01qkqnpfesmgcueks2hr01qkqnpfesn0"

  const part2 = part1.split("&")[0] // "symbol=YPF"

  const split = part2.split("=")[1] // "YPF"

  return split
}
