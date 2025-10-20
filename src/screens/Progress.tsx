import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/ScreenHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Progress as ProgressBar } from '../components/ui/Progress';
import { colors } from '../theme';
import { Crown } from 'lucide-react-native';

export default function Progress() {
  const weeklyStats = [
    { label: 'Games Played', value: '23', positive: true },
    { label: 'Win Rate', value: '67%', positive: true },
    { label: 'Avg Accuracy', value: '84%', positive: true },
    { label: 'Study Time', value: '4.2h', positive: true },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader title="Your Progress" subtitle="Track your chess improvement" LeftIcon={Crown} />
      <View style={{ padding: 24 }}>
        <Card style={{ marginBottom: 16 }}>
          <CardHeader>
            <CardTitle>Coach Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ fontSize: 32, fontWeight: '800', color: colors.coachPrimary }}>78</Text>
              <Text style={{ color: colors.mutedText }}>2 points to next level</Text>
            </View>
            <ProgressBar value={78} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent>
            {weeklyStats.map((s, idx) => (
              <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }}>
                <Text style={{ color: colors.mutedText }}>{s.label}</Text>
                <Text style={{ fontWeight: '700' }}>{s.value}</Text>
              </View>
            ))}
          </CardContent>
        </Card>
      </View>
    </SafeAreaView>
  );
}
