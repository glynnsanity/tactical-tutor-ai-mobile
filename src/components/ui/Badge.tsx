import React from 'react';
import { Text, View, ViewStyle, TextStyle } from 'react-native';
import { colors, radii } from '../../theme';

export type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'danger';

export const Badge: React.FC<{ children: React.ReactNode; variant?: BadgeVariant; style?: ViewStyle; textStyle?: TextStyle }>
= ({ children, variant = 'default', style, textStyle }) => {
  let bg = '#eef2ff';
  let fg = colors.text;
  if (variant === 'secondary') { bg = '#f3f4f6'; fg = colors.mutedText; }
  if (variant === 'success') { bg = '#ecfdf5'; fg = colors.success; }
  if (variant === 'warning') { bg = '#fef3c7'; fg = colors.warning; }
  if (variant === 'danger') { bg = '#fee2e2'; fg = colors.danger; }
  return (
    <View style={[{ backgroundColor: bg, paddingVertical: 4, paddingHorizontal: 8, borderRadius: radii.sm }, style]}>
      <Text style={[{ color: fg, fontSize: 12, fontWeight: '600' }, textStyle]}>{children}</Text>
    </View>
  );
};
