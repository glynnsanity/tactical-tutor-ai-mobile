import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { colors, radii, shadows } from '../../theme';

export const Card: React.FC<{ style?: ViewStyle; children: React.ReactNode }> = ({ style, children }) => (
  <View style={[{ backgroundColor: colors.cardBg, borderRadius: radii.md, borderWidth: 1, borderColor: colors.cardBorder, padding: 16 }, shadows.card, style]}>{children}</View>
);

export const CardHeader: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => (
  <View style={[{ marginBottom: 8 }, style]}>{children}</View>
);

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={{ fontWeight: '700', fontSize: 16, color: colors.text }}>{children}</Text>
);

export const CardContent: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => (
  <View style={style}>{children}</View>
);
