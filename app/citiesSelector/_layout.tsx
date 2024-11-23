import React, { memo, useEffect } from 'react';
import Background from '../../components/Background';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import RootContainer from '@/components/RootContainer';
import Picker, { Item } from '@/components/Picker';
import { useTranslation } from 'react-i18next';
import { useCitiesQuery } from '@/api/cities/hooks';
import { useMarketsQuery } from '@/api/markets/hooks';
import { ICity } from '@/types/types';
import Button from '@/components/Button';
import { router } from 'expo-router';

const LoginScreen = () => {
  const theme = useTheme();
  const [currentCity, setCurrentCity] = React.useState<ICity>();
  const [currentMarket, setCurrentMarket] = React.useState('');

  const handleChange = (cityId: string) => {
    const targetedcity = cities?.find((city) => city.id === cityId);
    if (targetedcity) {
      setCurrentCity(targetedcity);
    }
  };
  const { t } = useTranslation();

  const { data: cities, isLoading: isCitiesLoading } = useCitiesQuery();

  useEffect(() => {
    if (cities) setCurrentCity(cities[0]);
  }, [cities]);

  console.log('currentCity', currentCity);
  const { data: markets, isLoading: isMarketsLoading } =
    useMarketsQuery(currentCity);

  const onPress = () => {
    router.replace('/dashboard');
  };

  return (
    <Background>
      <RootContainer centered title={t('CitiesSelector.title')}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Picker
            selectedValue={currentCity?.id}
            onValueChange={handleChange}
            placeholder="City"
          >
            {cities?.map((city) => (
              <Item
                key={city.id}
                label={city.name}
                value={city.id}
                color={theme.colors.primary}
              />
            ))}
          </Picker>
          <Picker
            selectedValue={currentMarket}
            onValueChange={setCurrentMarket}
            placeholder="Market"
          >
            {markets?.map((market) => (
              <Item
                key={market.id}
                label={market.name}
                value={market.id}
                color={theme.colors.primary}
              />
            ))}
          </Picker>
          {isCitiesLoading || isMarketsLoading ? (
            <ActivityIndicator />
          ) : (
            <Button mode="contained" style={{ width: '50%' }} onPress={onPress}>
              {t('CitiesSelector.button.continue')}
            </Button>
          )}
        </View>
      </RootContainer>
    </Background>
  );
};

export default memo(LoginScreen);
