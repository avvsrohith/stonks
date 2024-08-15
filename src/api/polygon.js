// api/polygon.js
import axios from "axios";
const POLYGON_API_KEY = 'uy0RpUlyETvpH4pf0sybaUkTUvdqUfkB';
const BASE_URL = 'https://api.polygon.io';

const polygonClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: POLYGON_API_KEY
  }
});

export const getAggregates = async (symbol, multiplier, timespan, from, to) => {
  try {
    const response = await polygonClient.get(`/v2/aggs/ticker/${symbol}/range/${multiplier}/${timespan}/${from}/${to}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching aggregates:', error);
    throw error;
  }
};

export const getLatestTrade = async (symbol) => {
    try {
      const response = await polygonClient.get(`/v2/last/trade/${symbol}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest trade:', error);
      throw error;
    }
  };