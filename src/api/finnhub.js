import axios from 'axios';

const API_KEY = 'cqtkb5hr01qv9ctn41agcqtkb5hr01qv9ctn41b0'; // Replace with your actual API key
const BASE_URL = 'https://finnhub.io/api/v1/quote?symbol=';

const finnhubClient = axios.create({
  baseURL: BASE_URL,
  params: {
    token: API_KEY
  }
});
console.log(finnhubClient);
export const getStockQuote = async (symbol) => {
  try {
    const response= await axios.get(`${BASE_URL}${symbol}&token=${API_KEY}`);
    // const response = await finnhubClient.get(`/quote`, { params: { symbol } });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
};

export const getCompanyProfile = async (symbol) => {
  try {
    const response = await finnhubClient.get(`/stock/profile2`, { params: { symbol } });
    return response.data;
  } catch (error) {
    console.error('Error fetching company profile:', error);
    throw error;
  }
};

export const getStockCandles = async (symbol, resolution, from, to) => {
  try {
    const response = await finnhubClient.get(`/stock/candle`, {
      params: { symbol, resolution, from, to }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock candles:', error);
    throw error;
  }
};
