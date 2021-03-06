import * as React from 'react';
import { Text } from 'react-native';
import theme from '../theme';

export function StyledText(props) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: theme.fonts.titles }]}
    />
  );
}
