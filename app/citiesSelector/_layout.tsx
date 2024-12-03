import React, { memo, useEffect } from 'react';
import Background from '../../components/Background';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import RootContainer from '@/components/RootContainer';
import Picker, { Item } from '@/components/Picker';
import { useTranslation } from 'react-i18next';
import { useCitiesQuery } from '@/api/cities/hooks';
import { useMarketsQuery } from '@/api/markets/hooks';
import { ICity, IMarket } from '@/types/types';
import Button from '@/components/Button';
import { router } from 'expo-router';
import useSelectedData from '@/contexts/market/useSelectedData';
import Header from '@/components/Header';

const LoginScreen = () => {
  const theme = useTheme();
  const { setCurrentMarket, setCurrentCity } = useSelectedData();
  const [selectedCity, setPickerCurrentCity] = React.useState<ICity>();
  const [selectedMarket, setPickerCurrentMarket] = React.useState<IMarket>();

  const handleCityChange = (city: ICity) => {
    if (city) {
      setPickerCurrentCity(city);
    }
  };

  const handleMarketChange = (market: IMarket) => {
    if (market) {
      setPickerCurrentMarket(market);
    }
  };

  const { t } = useTranslation();

  const { data: cities, isLoading: isCitiesLoading } = useCitiesQuery();

  useEffect(() => {
    if (cities) setPickerCurrentCity(cities[0]);
  }, [cities]);

  const { data: markets, isLoading: isMarketsLoading } =
    useMarketsQuery(selectedCity);

  const onPress = () => {
    if (selectedCity && selectedMarket) {
      setCurrentCity(selectedCity);
      setCurrentMarket(selectedMarket);
      router.replace('/dashboard');
    }
  };

  return (
    <Background>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          width: '100%',
        }}
      >
        <Header>{t('CitiesSelector.title')}</Header>
        <Picker
          selectedValue={selectedCity}
          onValueChange={handleCityChange}
          placeholder="City"
          data={cities}
          renderItem={(city) => (
            <Item
              key={city.id}
              label={city.name}
              value={city}
              color={theme.colors.primary}
            />
          )}
        />
        <Picker
          selectedValue={selectedMarket}
          onValueChange={handleMarketChange}
          placeholder="Market"
          data={markets}
          renderItem={(market) => (
            <Item
              key={market.id}
              label={market.name}
              value={market}
              color={theme.colors.primary}
            />
          )}
        />
        {isCitiesLoading || isMarketsLoading ? (
          <ActivityIndicator />
        ) : (
          <Button mode="contained" style={{ width: '50%' }} onPress={onPress}>
            {t('CitiesSelector.button.continue')}
          </Button>
        )}
      </View>
    </Background>
  );
};

export default memo(LoginScreen);
