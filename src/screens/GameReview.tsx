import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/ScreenHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { colors } from '../theme';
import { Crown } from 'lucide-react-native';

export default function GameReview() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader title="Game Review" subtitle="Analyze and learn from your games" LeftIcon={Crown} />
      <View style={{ padding: 24 }}>
        <Card style={{ marginBottom: 16 }}>
          <CardHeader>
            <CardTitle>Recent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={{ alignItems: 'center', marginBottom: 12 }}>
              <Image source={require('../../assets/chess-analysis-icon.jpg')} style={{ width: 48, height: 48, borderRadius: 6 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Stat label="Wins" value="2W" color={colors.success} />
              <Stat label="Losses" value="1L" color={colors.danger} />
              <Stat label="Draws" value="1D" color={colors.warning} />
            </View>
          </CardContent>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const Stat: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ fontSize: 18, fontWeight: '700', color }}>{value}</Text>
    <Text style={{ color: colors.mutedText, fontSize: 12 }}>{label}</Text>
  </View>
);
