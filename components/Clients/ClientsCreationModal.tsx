import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Modal, Portal, Text, MD3Theme, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

import TextInput from '../TextInput';
import Divider from '../Divider';
import Button from '../Button';
import { ICity, APIClient } from '@/types/types';

interface ClientsCreationModalsuspenseProps {
  onClose: () => void;
  onAddClient: (arg0: APIClient) => void;
  city: ICity;
}

type FormValues = {
  firstName: string;
  lastName: string;
  postalCode?: number;
  city: string;
  address: string;
  activity: string;
  siret: string;
};

const ClientsCreationModalSuspense: React.FC<
  ClientsCreationModalsuspenseProps
> = ({ onClose, onAddClient, city }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      city: '',
      address: '',
      activity: '',
      siret: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    onAddClient({
      firstName: data.firstName,
      lastName: data.lastName,
      cityId: city.id,
      siren: data.siret,
      postalCode: data.postalCode,
      city: data.city,
      address: data.address,
      job: data.activity,
    });
    onClose();
  };

  return (
    <View style={{}}>
      <View style={styles.titleContainer}>
        <Text style={styles.textName}>{t('Clients.modal.title')}</Text>
      </View>
      <Divider style={styles.textInputStyle}>
        {t('Clients.modal.separator.identity')}
      </Divider>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            required
            label={t('Clients.modal.input.firstName')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors?.firstName}
            errorText={'This is required.'}
            style={styles.textInputStyle}
          />
        )}
        name="firstName"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            required
            label={t('Clients.modal.input.lastName')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors?.lastName}
            errorText={'This is required.'}
            style={styles.textInputStyle}
          />
        )}
        name="lastName"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={t('Clients.modal.input.postalCode')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value ? `${value}` : ''}
            error={!!errors?.postalCode}
            errorText={'This is required.'}
            style={styles.textInputStyle}
          />
        )}
        name="postalCode"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={t('Clients.modal.input.city')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors?.city}
            errorText={'This is required.'}
            style={styles.textInputStyle}
          />
        )}
        name="city"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={t('Clients.modal.input.address')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors?.address}
            errorText={'This is required.'}
            style={styles.textInputStyle}
          />
        )}
        name="address"
      />
      <Divider style={styles.textInputStyle}>
        {t('Clients.modal.separator.activity')}
      </Divider>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={t('Clients.modal.input.activity')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors?.activity}
            errorText={'This is required.'}
            style={styles.textInputStyle}
          />
        )}
        name="activity"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            required
            label={t('Clients.modal.input.siret')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors?.siret}
            errorText={'This is required.'}
            style={styles.textInputStyle}
          />
        )}
        name="siret"
      />
      <View style={styles.footer}>
        <Button onPress={onClose}>{t('Button.cancel')}</Button>
        <Button onPress={handleSubmit(onSubmit)}>{t('Button.validate')}</Button>
      </View>
    </View>
  );
};

interface ClientsCreationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddClient: (arg0: APIClient) => void;
  city: ICity;
}

const ClientsCreationModal: React.FC<ClientsCreationModalProps> = ({
  isVisible,
  onClose,
  onAddClient,
  city,
}) => {
  const theme = useTheme();
  const containerStyle = {
    padding: 5,
    paddingTop: 10,
    backgroundColor: theme.colors.surface,
  };

  return (
    <Portal>
      <Modal
        visible={isVisible}
        contentContainerStyle={containerStyle}
        style={{
          width: '90%',
          margin: '5%',
        }}
      >
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
          {isVisible && (
            <ClientsCreationModalSuspense
              onClose={onClose}
              onAddClient={onAddClient}
              city={city}
            />
          )}
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default ClientsCreationModal;

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    textName: {
      fontSize: 20,
      color: theme.colors.primary,
      paddingTop: 2,
      textAlign: 'center',
    },
    textInputStyle: {
      marginVertical: 5,
    },
    footer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    titleContainer: {
      padding: 10,
      backgroundColor: theme.colors.tertiary,
    },
  });
