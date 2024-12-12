import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { formatResponse, formatQueryData } from '../utils';
import { config } from '@/config';

import { IClient, ICity, APIClient } from '@/types/types';
import { getClientsQuery } from './helpers';
import { getItemAsync } from 'expo-secure-store';

export const useClientsQuery = (
  currentCity: ICity | undefined,
  onSuccess?: (res: IClient[]) => void
) => {
  return useSuspenseQuery<IClient[]>({
    ...getClientsQuery(currentCity, onSuccess),
  });
};

interface useClientMutationParams {
  onSuccess?: (arg0: IClient[]) => void;
  onError?: (arg0: Error) => void;
}

export const useClientMutation = ({
  onSuccess,
  onError,
}: useClientMutationParams) => {
  return useMutation({
    mutationFn: async (newClient: APIClient) => {
      const token = await getItemAsync('secure_token');
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formatQueryData(newClient)),
      };
      return fetch(`${config.API_URL}/api/client?`, requestOptions)
        .then((response) => response.json())
        .then((response) => formatResponse(response));
    },
    onSuccess: (data) => {
      onSuccess?.(data as IClient[]);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
