import React from 'react';
import { View } from 'react-native';
import { colors, radii } from '../../theme';

export const Progress: React.FC<{ value: number }> = ({ value }) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <View style={{ height: 8, width: '100%', backgroundColor: '#e5e7eb', borderRadius: radii.sm }}>
      <View style={{ height: 8, width: `${clamped}%`, backgroundColor: colors.coachGold, borderRadius: radii.sm }} />
    </View>
  );
};
