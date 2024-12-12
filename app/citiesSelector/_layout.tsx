import React, { memo, useEffect } from 'react';
import {
  ActivityIndicator,
  MD3Theme,
  Surface,
  useTheme,
} from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Picker, { Item } from '@/components/Picker';
import { useTranslation } from 'react-i18next';
import { useCitiesQuery } from '@/api/cities/hooks';
import { useMarketsQuery } from '@/api/markets/hooks';
import { ICity, IMarket } from '@/types/types';
import Button from '@/components/Button';
import { router } from 'expo-router';
import useSelectedData from '@/contexts/market/useSelectedData';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { setCurrentMarket, setCurrentCity } = useSelectedData();
  const [pickerCity, setPickerCity] = React.useState<ICity>();
  const [pickerMarket, setPickerMarket] = React.useState<IMarket>();

  const handleCityChange = (city: ICity) => {
    if (city) {
      setPickerCity(city);
    }
  };

  const handleMarketChange = (market: IMarket) => {
    if (market) {
      setPickerMarket(market);
    }
  };

  const { t } = useTranslation();

  const { data: cities, isLoading: isCitiesLoading } = useCitiesQuery();

  useEffect(() => {
    if (cities) setPickerCity(cities[0]);
  }, [cities]);

  const { data: markets, isLoading: isMarketsLoading } =
    useMarketsQuery(pickerCity);

  useEffect(() => {
    if (markets) setPickerMarket(markets[0]);
  }, [markets]);

  const onPress = () => {
    if (pickerCity && pickerMarket) {
      setCurrentCity(pickerCity);
      setCurrentMarket(pickerMarket);
      router.push('./dashboard');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Surface style={styles.surface} elevation={1}>
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
              selectedValue={pickerCity}
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
              selectedValue={pickerMarket}
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
              <Button
                mode="contained"
                style={{ width: '50%' }}
                onPress={onPress}
              >
                {t('CitiesSelector.button.continue')}
              </Button>
            )}
          </View>
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
      height: '50%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: theme.colors.surface,
    },
  });

export default memo(LoginScreen);
