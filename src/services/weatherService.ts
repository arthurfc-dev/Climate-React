import axios from 'axios';
import { API_KEY, API_BASE_URL } from '../config/api';

export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

export const weatherService = {
  async getWeatherByCity(city: string): Promise<WeatherResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
          lang: 'pt_br',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do clima:', error);
      throw error;
    }
  },
}; 