import * as React from 'react';
import { Text } from 'react-native';
import { theme } from '../theme.js';

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'Rockwell' }]} />;
}
