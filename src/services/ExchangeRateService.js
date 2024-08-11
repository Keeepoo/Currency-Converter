import axios from 'axios';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

const getExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(`${API_URL}${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};

export default getExchangeRates;
