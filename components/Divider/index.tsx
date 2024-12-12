import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { MD3Theme, Text, useTheme } from 'react-native-paper';

interface DividerProps {
  style?: StyleProp<ViewStyle>;
}
const Divider = ({ children, style }: PropsWithChildren<DividerProps>) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.divider} />
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center' },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.secondary,
    },
    text: {
      textAlign: 'center',
      paddingHorizontal: 8,
    },
  });

export default Divider;
