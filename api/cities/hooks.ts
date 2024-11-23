import { useQuery } from '@tanstack/react-query';
import { formatResponse } from '../utils';
import { config } from '@/config';

import { ICity } from '@/types/types';
import { getItemAsync } from 'expo-secure-store';

export const fetchCities: () => Promise<Response> = async () => {
  const token = await getItemAsync('secure_token');
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  return fetch(`${config.API_URL}/api/cities`, {
    headers,
  });
};

export const useCitiesQuery = () => {
  return useQuery<ICity[]>({
    queryKey: ['cities'],
    queryFn: () =>
      fetchCities()
        .then((res) => res.json())
        .then((data) => formatResponse(data) as ICity[]),
  });
};
