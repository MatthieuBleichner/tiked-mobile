import React, { PropsWithChildren } from 'react';
import { MD3Theme, Surface, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Button from '../Button';
import { Button as PaperButton } from 'react-native-paper';

interface RootContainerProps {
  title: string;
  centered?: boolean;
  buttonText?: string;
  onPressButton?: () => void;
}

const RootContainer = ({
  title,
  centered,
  buttonText,
  onPressButton,
  children,
}: PropsWithChildren<RootContainerProps>) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <Surface style={styles.surface} elevation={1}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 50,
        }}
      >
        <Text style={[styles.text, centered ? { textAlign: 'center' } : {}]}>
          {title}
        </Text>
        {buttonText && <Button onPress={onPressButton}>{buttonText}</Button>}
      </View>
      {children}
    </Surface>
  );
};

export default React.memo(RootContainer);

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    surface: {
      padding: 8,
      display: 'flex',
      flex: 1,
      height: 300,
      width: '95%',
      borderRadius: 10,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 30,
      color: theme.colors.primary,
      fontWeight: 'bold',
      width: '50%',
    },
  });
