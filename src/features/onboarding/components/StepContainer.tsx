import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StepContainer({ title, subtitle, children, footer, isBusy }: { title?: string; subtitle?: string; children: React.ReactNode; footer?: React.ReactNode; isBusy?: boolean; }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
        {title && <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 6 }}>{title}</Text>}
        {subtitle && <Text style={{ color: '#6b7280', marginBottom: 12 }}>{subtitle}</Text>}
        {children}
      </ScrollView>
      {!!footer && (
        <View style={{ padding: 16, borderTopWidth: 1, borderColor: '#e5e7eb', backgroundColor: 'white' }}>{footer}</View>
      )}
      {isBusy && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.05)' }}>
          <ActivityIndicator />
        </View>
      )}
    </SafeAreaView>
  );
}
