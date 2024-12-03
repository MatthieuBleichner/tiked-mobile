import { formatResponse } from '../utils';
import { config } from '@/config';
import { IClient, ICity } from '@/types/types';
import { getItemAsync } from 'expo-secure-store';

const fetchClients = async (
  currentCity: ICity | undefined
): Promise<Response> => {
  const token = await getItemAsync('secure_token');
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  return fetch(`${config.API_URL}/api/clients?cityId=${currentCity?.id}`, {
    headers,
  });
};

export const getClientsQuery = (
  currentCity: ICity | undefined,
  onSuccess?: (res: IClient[]) => void
) => ({
  queryKey: ['clients', currentCity?.id || ''],
  queryFn: () =>
    fetchClients(currentCity)
      .then((res) => res.json())
      .then((res) => {
        if (res.length) onSuccess?.(res);
        return formatResponse(res) as IClient[];
      }),
});
