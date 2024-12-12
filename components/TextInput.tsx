import React, { memo } from 'react';
import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../core/theme';

type Props = React.ComponentProps<typeof Input> & {
  errorText?: string;
  error?: boolean;
  style?: StyleProp<ViewStyle>;
  required?: boolean;
  label: string;
};

const TextInput = ({
  errorText,
  error,
  required,
  label,
  style,
  ...props
}: Props) => (
  <View style={[styles.container, style]}>
    <Input
      style={styles.input}
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      error={error}
      label={required ? `${label} *` : label}
      {...props}
    />
    {error && errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
