import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ style, children, ...props }: Props) => (
  <PaperButton
    uppercase
    style={[styles.button, style]}
    mode="contained"
    labelStyle={styles.text}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    //marginVertical: 2,
    borderRadius: 5,
  },
  text: {
    fontSize: 13,
    lineHeight: 14,
    textAlign: 'center',
    marginHorizontal: 15,
  },
});

export default memo(Button);
