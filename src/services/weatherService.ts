import axios, { AxiosError } from 'axios';
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

export class WeatherError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherError';
  }
}

export const weatherService = {
  async getWeatherByCity(city: string): Promise<WeatherResponse> {
    try {
      if (!API_KEY) {
        throw new WeatherError('Chave da API não configurada');
      }

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
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new WeatherError('Cidade não encontrada');
        }
        if (error.response?.status === 401) {
          throw new WeatherError('Chave da API inválida');
        }
        throw new WeatherError('Erro ao buscar dados do clima');
      }
      throw error;
    }
  },
}; 