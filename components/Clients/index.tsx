import useSelectedData from '@/contexts/market/useSelectedData';
import { ICity, IClient } from '@/types/types';
import { ErrorBoundary } from 'react-error-boundary';
import React, { memo, Suspense, useCallback, useState } from 'react';
import { getClientsQuery } from '@/api/clients/helpers';
import { useSuspenseQuery } from '@tanstack/react-query';
import Picker, { Item } from '../Picker';
import { MD3Theme, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import RootContainer from '../RootContainer';
import { useTranslation } from 'react-i18next';

interface ClientsSuspenseProps {
  currentCity: ICity;
}

const ClientsSuspense: React.FC<ClientsSuspenseProps> = ({ currentCity }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { t } = useTranslation();

  const { queryKey, queryFn } = getClientsQuery(currentCity);
  const { data: clients = [] } = useSuspenseQuery<IClient[]>({
    queryKey,
    queryFn,
  });

  const [client, setClient] = useState<IClient>(clients[0]);

  console.log('client', client);
  const renderItem = useCallback((client: IClient) => {
    return (
      <Item
        key={client.id}
        label={`${client.firstName} ${client.lastName}`}
        value={client}
        color={theme.colors.primary}
      />
    );
  }, []);

  return (
    <RootContainer title={t('Clients.title')} buttonText={t('Clients.button')}>
      <View
        style={{
          marginTop: 15,
        }}
      >
        <Picker
          selectedValue={client}
          onValueChange={setClient}
          placeholder="City"
          data={clients}
          renderItem={renderItem}
        />
        <View style={{ marginLeft: 15 }}>
          <Text
            style={styles.textName}
          >{`${client.firstName} ${client.lastName}`}</Text>
          <Text style={styles.textJob}>{`${client.job}`}</Text>
          <Text style={styles.text}>{`${client.mail}`}</Text>
          <Text
            style={styles.text}
          >{`${client.address} ${client.postalCode} ${client.city}`}</Text>
          <Text style={styles.text}>{`Siret: ${client.siren}`}</Text>
        </View>
      </View>
    </RootContainer>
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

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    textName: {
      fontSize: 20,
      color: theme.colors.primary,
      fontWeight: 'bold',
      paddingTop: 2,
    },
    textJob: {
      fontSize: 17,
      fontWeight: 'bold',
      paddingTop: 2,
    },
    text: {
      fontSize: 17,
      paddingTop: 2,
    },
  });
