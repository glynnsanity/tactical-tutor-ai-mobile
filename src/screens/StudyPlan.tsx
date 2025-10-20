import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/ScreenHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Progress as ProgressBar } from '../components/ui/Progress';
import { colors } from '../theme';
import { BookOpen } from 'lucide-react-native';

export default function StudyPlan() {
  const modules = [
    { title: 'Endgame Technique', description: 'Master fundamental endgames', progress: 25 },
    { title: 'Positional Understanding', description: 'Learn strategic principles', progress: 0 },
    { title: 'Time Management', description: 'Improve your clock handling', progress: 60 },
    { title: 'Tactical Patterns', description: 'Sharpen your tactical vision', progress: 90 },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader title="Study Plan" subtitle="Personalized curriculum based on your weaknesses" LeftIcon={BookOpen} />
      <View style={{ padding: 24 }}>
        <Card style={{ marginBottom: 16 }}>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={{ marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Study Plan Completion</Text>
              <Text style={{ fontWeight: '700' }}>44%</Text>
            </View>
            <ProgressBar value={44} />
            <View style={{ marginTop: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: colors.mutedText, fontSize: 12 }}>14 lessons completed</Text>
              <Text style={{ color: colors.mutedText, fontSize: 12 }}>21 lessons remaining</Text>
            </View>
          </CardContent>
        </Card>

        {modules.map((m, i) => (
          <Card key={i} style={{ marginBottom: 12 }}>
            <CardHeader>
              <CardTitle>{m.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={{ color: colors.mutedText, marginBottom: 8 }}>{m.description}</Text>
              <ProgressBar value={m.progress} />
            </CardContent>
          </Card>
        ))}
      </View>
    </SafeAreaView>
  );
}
