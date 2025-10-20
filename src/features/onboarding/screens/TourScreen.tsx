import React from 'react';
import { View, Text, Button } from 'react-native';
import StepContainer from '../components/StepContainer';
import ProgressStepper from '../components/ProgressStepper';
import { useNavigation } from '@react-navigation/native';
import { track } from '../../../lib/analytics';

export default function TourScreen() {
  const nav = useNavigation();
  return (
    <StepContainer
      title="What you can do"
      subtitle="Analyze your games, train tactics, and track progress."
      footer={(
        <View style={{ gap: 8 }}>
          <Button title="Next" onPress={() => { track('onboarding_tour_completed'); (nav as any).navigate('Username'); }} />
          <Button title="Skip" onPress={() => { track('onboarding_tour_skipped'); (nav as any).navigate('Username'); }} />
        </View>
      )}
    >
      <ProgressStepper current={2} total={4} />
      <Text>• Analyze: get quick summaries of your recent games.</Text>
      <Text>• Train: personalized puzzles based on your mistakes.</Text>
      <Text>• Progress: track your improvement over time.</Text>
    </StepContainer>
  );
}
