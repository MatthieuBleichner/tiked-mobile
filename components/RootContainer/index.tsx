import React, { PropsWithChildren } from 'react';
import { MD3Theme, Surface, Text, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface RootContainerProps {
  title: string;
  centered?: boolean;
}

const RootContainer = ({
  title,
  centered,
  children,
}: PropsWithChildren<RootContainerProps>) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <Surface style={styles.surface} elevation={1}>
      <Text style={[styles.text, centered ? { textAlign: 'center' } : {}]}>
        {title}
      </Text>
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
      backgroundColor: '#f5f5f5',
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 35,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  });
