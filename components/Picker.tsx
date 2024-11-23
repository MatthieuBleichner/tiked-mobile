import React, { PropsWithChildren } from 'react';
import { MD3Theme, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Picker as PickerRNP } from '@react-native-picker/picker';

interface PickerProps {
  selectedValue: string | undefined;
  onValueChange: ((itemValue: any, itemIndex: number) => void) | undefined;
  placeholder: string;
}

export const Item: any = PickerRNP.Item;

const Picker = ({
  selectedValue,
  onValueChange,
  placeholder,
  children,
}: PropsWithChildren<PickerProps>) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.pickerContainer}>
      <PickerRNP
        testID="basic-picker"
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        accessibilityLabel="Basic Picker Accessibility Label"
        mode="dialog"
        placeholder={placeholder}
        style={styles.picker}
      >
        {children}
      </PickerRNP>
    </View>
  );
};

export default React.memo(Picker);

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    pickerContainer: {
      display: 'flex',
      width: '80%',
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#696969',
      marginBottom: 10,
      borderRadius: 5,
      backgroundColor: 'white',
    },
    picker: {
      backgroundColor: 'white',
      color: theme.colors.primary,
      width: '95%',
      height: '95%',
    },
  });
