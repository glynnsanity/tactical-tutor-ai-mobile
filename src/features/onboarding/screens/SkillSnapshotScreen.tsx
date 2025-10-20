import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import StepContainer from '../components/StepContainer';
import ProgressStepper from '../components/ProgressStepper';
import { useNavigation } from '@react-navigation/native';
import { track } from '../../../lib/analytics';

export default function SkillSnapshotScreen() {
  const nav = useNavigation();
  return (
    <StepContainer
      title="Quick skill snapshot"
      subtitle="Solve 3 quick puzzles or paste a recent game PGN."
      footer={(
        <View style={{ gap: 8 }}>
          <Button title="Continue" onPress={() => { track('onboarding_skill_snapshot_completed', { method: 'pgn', estimate: 1500 }); (nav as any).navigate('Goals'); }} />
          <Button title="Skip" onPress={() => (nav as any).navigate('Goals')} />
        </View>
      )}
    >
      <ProgressStepper current={3} total={11} />
      <Text style={{ marginBottom: 8 }}>Paste PGN</Text>
      <TextInput multiline style={{ borderWidth: 1, minHeight: 120, padding: 8, borderRadius: 6 }} />
    </StepContainer>
  );
}
