import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

import theme from '../theme.js';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? theme.colors.primary.safe : theme.colors.fonts.medium}
    />
  );
}
