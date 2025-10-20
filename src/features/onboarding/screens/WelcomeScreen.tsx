import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import StepContainer from '../components/StepContainer';
import ProgressStepper from '../components/ProgressStepper';
import { useNavigation } from '@react-navigation/native';
import { track } from '../../../lib/analytics';

export default function WelcomeScreen() {
  const nav = useNavigation();
  useEffect(() => { track('onboarding_welcome_shown'); }, []);
  return (
    <StepContainer
      title="Welcome to your smarter chess training."
      subtitle="We analyze your games, find patterns, and give you targeted practice."
      footer={(
        <View style={{ gap: 8 }}>
          <Button title="Get started" onPress={() => { track('onboarding_start_clicked'); (nav as any).navigate('Tour'); }} />
        </View>
      )}
    >
      <ProgressStepper current={1} total={4} />
    </StepContainer>
  );
}
