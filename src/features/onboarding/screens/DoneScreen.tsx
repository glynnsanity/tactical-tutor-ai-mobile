import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import StepContainer from '../components/StepContainer';
import { useNavigation } from '@react-navigation/native';
import { useOnboardingStore } from '../store/onboardingStore';
import { track } from '../../../lib/analytics';

export default function DoneScreen() {
  const nav = useNavigation();
  const { set } = useOnboardingStore();
  useEffect(() => { track('onboarding_completed'); }, []);
  return (
    <StepContainer title="You're all set" subtitle="You're ready to analyze and train.">
      <View style={{ gap: 12 }}>
        <Text>We’ll take you into the app.</Text>
        <Button title="Continue" onPress={() => { set({ onboarded: true }); }} />
      </View>
    </StepContainer>
  );
}
