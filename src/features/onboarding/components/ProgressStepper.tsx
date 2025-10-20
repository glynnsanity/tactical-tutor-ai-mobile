import React from 'react';
import { View } from 'react-native';

export default function ProgressStepper({ current, total }: { current: number; total: number }) {
  const items = Array.from({ length: total });
  return (
    <View style={{ flexDirection: 'row', gap: 6, marginBottom: 12 }}>
      {items.map((_, i) => (
        <View key={i} style={{ height: 4, flex: 1, backgroundColor: i < current ? '#111827' : '#e5e7eb', borderRadius: 2 }} />
      ))}
    </View>
  );
}
