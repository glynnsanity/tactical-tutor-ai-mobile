import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import StepContainer from '../components/StepContainer';
import ProgressStepper from '../components/ProgressStepper';
import { useNavigation } from '@react-navigation/native';
import { track } from '../../../lib/analytics';

export default function ImportGamesScreen() {
  const nav = useNavigation();
  return (
    <StepContainer
      title="Import games (optional)"
      subtitle="Paste 1–3 PGNs for better personalization."
      footer={(
        <View style={{ gap: 8 }}>
          <Button title="Continue" onPress={() => { track('onboarding_import_skip'); (nav as any).navigate('AnalyzeNow'); }} />
          <Button title="Skip" onPress={() => (nav as any).navigate('AnalyzeNow')} />
        </View>
      )}
    >
      <ProgressStepper current={6} total={11} />
      <Text style={{ marginBottom: 8 }}>Paste PGN(s)</Text>
      <TextInput multiline style={{ borderWidth: 1, minHeight: 120, padding: 8, borderRadius: 6 }} />
    </StepContainer>
  );
}
