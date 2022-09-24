import axios from "axios";
import { API_BINANCE_URL } from "./constants";

export type BinanceDataResponse = {
  minutes: string;
  price: number;
}

export const fetchBinanceData = async (coin: string, currency: string): Promise<BinanceDataResponse> => {
  const resp = await axios(
    `${API_BINANCE_URL}/avgPrice?symbol=${coin}${currency}`
  );
    return {
        minutes: resp.data.mins,
        price: resp.data.price
    };
};
