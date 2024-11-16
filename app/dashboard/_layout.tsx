import React, { memo } from 'react';
import Background from '../../components/Background';
import Header from '../../components/Header';

const LoginScreen = () => {
  return (
    <Background>
      <Header>Dashboard</Header>
    </Background>
  );
};

export default memo(LoginScreen);
