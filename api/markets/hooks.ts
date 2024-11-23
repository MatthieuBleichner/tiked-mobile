import { useQuery } from '@tanstack/react-query';
import { formatResponse } from '../utils';
import { config } from '@/config';

import { IMarket, ICity } from '@/types/types';
import { getItemAsync } from 'expo-secure-store';

const fetchMarkets: (arg0: string | undefined) => Promise<Response> = async (
  cityId
) => {
  const token = await getItemAsync('secure_token');
  const headers = { Authorization: `Bearer ${token}` };
  return fetch(`${config.API_URL}/api/markets?cityId=${cityId}`, { headers });
};

export const useMarketsQuery = (selectedCity: ICity | undefined) => {
  return useQuery<IMarket[]>({
    queryKey: ['markets', selectedCity?.id],
    queryFn: () =>
      fetchMarkets(selectedCity?.id).then((res) =>
        res.json().then((data) => formatResponse(data) as IMarket[])
      ),
    enabled: !!selectedCity?.id,
  });
};
