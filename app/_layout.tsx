import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import { theme } from '@/core/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SelectedDataProvider from '@/contexts/market/SelectedDataProvider';

// import i18n (needs to be bundled ;))
import '@/i18n';

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <SelectedDataProvider>
          <Stack>
            <Stack.Screen
              name="(authentication)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="citiesSelector"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </SelectedDataProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
