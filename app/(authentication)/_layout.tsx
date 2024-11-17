import React, { memo, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { emailValidator, passwordValidator } from '../../core/utils';
import { useAuthenticateMutation } from '@/api/authentication';
import { useTranslation } from 'react-i18next';
import { setItemAsync } from 'expo-secure-store';

import { router } from 'expo-router';
//import { Navigation } from '../types';

// type Props = {
//   navigation: Navigation;
// };

const LoginScreen = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const onAuthenticationSuccess = async (token: string) => {
    await setItemAsync('secure_token', token);
    router.replace('/dashboard');
  };

  const onAuthenticationError = async (error: Error) => {
    setEmail({ ...email, error: error.message });
  };

  const mutation = useAuthenticateMutation({
    onSuccess: onAuthenticationSuccess,
    onError: onAuthenticationError,
  });

  console.log('mutation', mutation.isPending);
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
    //navigation.navigate('Dashboard');
  };

  return (
    <Background>
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
        onChangeText={(text: string) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      {mutation.isPending ? (
        <ActivityIndicator />
      ) : (
        <Button mode="contained" onPress={_onLoginPressed}>
          {t('Authentication.button.login')}
        </Button>
      )}
    </Background>
  );
};

export default memo(LoginScreen);
