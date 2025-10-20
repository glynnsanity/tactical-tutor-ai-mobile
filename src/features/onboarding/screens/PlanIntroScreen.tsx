import React from 'react';
import { View, Text, Button } from 'react-native';
import StepContainer from '../components/StepContainer';
import ProgressStepper from '../components/ProgressStepper';
import { useNavigation } from '@react-navigation/native';
import { track } from '../../../lib/analytics';

export default function PlanIntroScreen() {
  const nav = useNavigation();
  return (
    <StepContainer
      title="Your plan"
      subtitle="Here’s your personalized focus areas."
      footer={(
        <View style={{ gap: 8 }}>
          <Button title="Start training (10 puzzles)" onPress={() => { track('onboarding_plan_confirmed', { themes: ['tactics'] }); (nav as any).navigate('Permissions'); }} />
          <Button title="Skip" onPress={() => (nav as any).navigate('Permissions')} />
        </View>
      )}
    >
      <ProgressStepper current={8} total={11} />
      <Text>Top themes: Back-rank, Hanging piece, Time trouble</Text>
    </StepContainer>
  );
}
