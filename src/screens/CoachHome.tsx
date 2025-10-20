import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/ScreenHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { colors } from '../theme';
import { Crown, MessageCircle, Target } from 'lucide-react-native';

export default function CoachHome() {
  const styleProfile = {
    playingStyle: 'Aggressive Tactician',
    rating: 1850,
    strengths: ['Sharp tactics', 'Opening theory', 'Attack patterns'],
    weaknesses: ['Endgame technique', 'Time management', 'Positional play'],
  };

  const todaysPlan = [
    { type: 'lesson', title: 'Rook Endgames: Opposition', time: '15 min' },
    { type: 'drill', title: 'Tactical Pattern: Pin & Fork', time: '10 min' },
    { type: 'review', title: "Yesterday's Blitz Game Analysis", time: '8 min' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader title="Good morning, Alex!" subtitle="Ready to improve your chess today?" LeftIcon={Crown} />
      <View style={{ padding: 24 }}>
        <Card style={{ marginBottom: 16 }}>
          <CardHeader>
            <CardTitle>
              Your Playing Style <Badge variant="secondary" style={{ marginLeft: 6 }} textStyle={{ color: colors.coachGold }}>Rating: {styleProfile.rating}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={{ alignItems: 'center', padding: 12, backgroundColor: '#f8fafc', borderRadius: 12, marginBottom: 12 }}>
              <Text style={{ fontWeight: '600', color: colors.coachPrimary }}>{styleProfile.playingStyle}</Text>
              <Text style={{ color: colors.mutedText, marginTop: 4 }}>Strong in tactics, needs endgame work</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#10b981', fontWeight: '600', marginBottom: 8 }}>Strengths</Text>
                {styleProfile.strengths.map((s, i) => (
                  <Text key={i} style={{ color: colors.mutedText }}>• {s}</Text>
                ))}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#f59e0b', fontWeight: '600', marginBottom: 8 }}>Focus Areas</Text>
                {styleProfile.weaknesses.map((w, i) => (
                  <Text key={i} style={{ color: colors.mutedText }}>• {w}</Text>
                ))}
              </View>
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Plan</CardTitle>
          </CardHeader>
          <CardContent>
            {todaysPlan.map((item, i) => (
              <View key={i} style={{ padding: 12, backgroundColor: '#f3f4f6', borderRadius: 10, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontWeight: '600' }}>{item.title}</Text>
                  <Text style={{ color: colors.mutedText, fontSize: 12 }}>{item.time}</Text>
                </View>
                <Text style={{ color: colors.mutedText }}>{'>'}</Text>
              </View>
            ))}
          </CardContent>
        </Card>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          <View style={{ flex: 1 }}>
            <Button variant="outline"><MessageCircle size={24} color={colors.coachPrimary} />  Ask Coach</Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button variant="outline"><Target size={24} color={colors.coachPrimary} />  Drill Me</Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
