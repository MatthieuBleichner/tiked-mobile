import React, { memo, useEffect } from 'react';
import Background from '../../components/Background';
import { getItemAsync } from 'expo-secure-store';
import {
  ActivityIndicator,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { StyleSheet, FlatList, View } from 'react-native';
import { theme } from '../../core/theme';
import { Picker } from '@react-native-picker/picker';
import RootContainer from '@/components/RootContainer';

const LoginScreen = () => {
  return (
    <Background>
      {/* <Surface style={styles.surface} elevation={1}>
        <Text style={styles.text}>Surface</Text>

      
      </Surface> */}
      <FlatList
        data={[
          { id: 'Clients', title: 'Clients' },
          { id: 'Factures', title: 'Factures' },
          { id: 'Bilan', title: 'Bilan' },
        ]}
        renderItem={(card) => (
          <View style={{ marginTop: 30 }}>
            <RootContainer title={card.item.id}></RootContainer>
          </View>
        )}
        style={{ width: '90%', marginTop: 10 }}
      />
    </Background>
  );
};

export default memo(LoginScreen);

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    // height: '50%',
    height: 300,
    width: '95%',
    //alignItems: 'center',
    //justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: 'bold',
    padding: 10,
  },
});
