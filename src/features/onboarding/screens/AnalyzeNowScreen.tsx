import React, { useState } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
import StepContainer from '../components/StepContainer';
import ProgressStepper from '../components/ProgressStepper';
import { useNavigation } from '@react-navigation/native';
import { track } from '../../../lib/analytics';

export default function AnalyzeNowScreen() {
  const nav = useNavigation();
  const [busy, setBusy] = useState(false);
  async function analyze() {
    setBusy(true);
    track('onboarding_analyze_started', { games: 1 });
    await new Promise(r => setTimeout(r, 800));
    setBusy(false);
    track('onboarding_analyze_completed', { topThemes: ['back-rank','hanging'] });
    (nav as any).navigate('PlanIntro');
  }
  return (
    <StepContainer
      title="Analyze now"
      subtitle="We’ll parse your game and summarize key themes."
      isBusy={busy}
      footer={(
        <View style={{ gap: 8 }}>
          <Button title="Analyze" onPress={analyze} />
          <Button title="Skip" onPress={() => (nav as any).navigate('PlanIntro')} />
        </View>
      )}
    >
      <ProgressStepper current={7} total={11} />
      {busy && <ActivityIndicator />}
    </StepContainer>
  );
}
