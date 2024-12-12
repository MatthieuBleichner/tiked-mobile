import React, { memo, useState } from 'react';
import {
  ActivityIndicator,
  MD3Theme,
  Surface,
  useTheme,
} from 'react-native-paper';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { emailValidator, passwordValidator } from '../../core/utils';
import { useAuthenticateMutation } from '@/api/authentication';
import { useTranslation } from 'react-i18next';
import { setItemAsync } from 'expo-secure-store';

import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const onAuthenticationSuccess = async (token: string) => {
    await setItemAsync('secure_token', token);
    router.replace('/citiesSelector');
  };

  const onAuthenticationError = async (error: Error) => {
    setEmail({ ...email, error: error.message });
  };

  const mutation = useAuthenticateMutation({
    onSuccess: onAuthenticationSuccess,
    onError: onAuthenticationError,
  });

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    mutation.mutate({
      id: email.value,
      password: password.value,
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Surface style={styles.surface} elevation={1}>
          <Header>TIKED</Header>

          <TextInput
            label={t('Authentication.input.email')}
            //label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <TextInput
            label={t('Authentication.input.password')}
            returnKeyType="done"
            value={password.value}
            onChangeText={(text: string) =>
              setPassword({ value: text, error: '' })
            }
            error={!!password.error}
            errorText={password.error}
            autoCapitalize="none"
            secureTextEntry
          />

          {mutation.isPending ? (
            <ActivityIndicator />
          ) : (
            <Button
              mode="contained"
              onPress={_onLoginPressed}
              style={{ width: '50%' }}
            >
              {t('Authentication.button.login')}
            </Button>
          )}
        </Surface>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
    },
    surface: {
      width: '95%',
      height: '80%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: theme.colors.surface,
    },
  });

export default memo(LoginScreen);
