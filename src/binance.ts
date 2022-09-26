import axios from "axios";
import { API_BINANCE_URL } from "./constants";

type KLine = {
  openTime: number;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  closePrince: string;
  closeTime: number;
  assetVolume: string;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: string;
  takerBuyBaseQuoteVolume: string;
  unusedFieldIgnore: string;
};

type KLineTuple = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string
];

export const fetchBinanceData = async (
  coin: string,
  currency: string
): Promise<KLine[]> => {
  const KLines: KLine[] = [];

  const response = await axios(
    `${API_BINANCE_URL}/klines?symbol=${coin}${currency}&interval=1m&limit=5`
  );

  response.data.map((item: KLineTuple) => {
    const kLineData = {
      openTime: item[0],
      openPrice: item[1],
      highPrice: item[2],
      lowPrice: item[3],
      closePrince: item[4],
      volume: item[5],
      closeTime: item[6],
      assetVolume: item[7],
      numberOfTrades: item[8],
      takerBuyBaseAssetVolume: item[9],
      takerBuyBaseQuoteVolume: item[10],
      unusedFieldIgnore: item[11]
    };

    KLines.push(kLineData);
  });
  return KLines;
};
