import useSelectedData from '@/contexts/market/useSelectedData';
import { ICity, IClient } from '@/types/types';
import { ErrorBoundary } from 'react-error-boundary';
import React, { memo, Suspense, useCallback, useState } from 'react';
import { getClientsQuery } from '@/api/clients/helpers';
import { useSuspenseQuery } from '@tanstack/react-query';
import Picker, { Item } from '../Picker';
import { useTheme } from 'react-native-paper';

interface ClientsSuspenseProps {
  currentCity: ICity;
}

const ClientsSuspense: React.FC<ClientsSuspenseProps> = ({ currentCity }) => {
  const theme = useTheme();
  const { queryKey, queryFn } = getClientsQuery(currentCity);
  const { data: clients = [] } = useSuspenseQuery<IClient[]>({
    queryKey,
    queryFn,
  });

  const [client, setClient] = useState<IClient>(clients[0]);

  const renderItem = useCallback((client: IClient) => {
    return (
      <Item
        key={client.id}
        label={client.firstName}
        value={client}
        color={theme.colors.primary}
      />
    );
  }, []);

  return (
    <Picker
      selectedValue={client}
      onValueChange={setClient}
      placeholder="City"
      data={clients}
      renderItem={renderItem}
    />
  );
};

const Clients: React.FC = () => {
  const { currentCity } = useSelectedData();

  return (
    <React.Fragment>
      <Suspense>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          {currentCity && <ClientsSuspense currentCity={currentCity} />}
        </ErrorBoundary>
      </Suspense>
    </React.Fragment>
  );
};

export default memo(Clients);
