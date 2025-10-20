import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import StepContainer from '../components/StepContainer';
import ProgressStepper from '../components/ProgressStepper';
import { useNavigation } from '@react-navigation/native';
import { track } from '../../../lib/analytics';

export default function AuthScreen() {
  const nav = useNavigation();
  return (
    <StepContainer
      title="Sign in or create account"
      subtitle="You can skip and continue as guest."
      footer={(
        <View style={{ gap: 8 }}>
          <Button title="Continue" onPress={() => { track('onboarding_auth_login_success', { method: 'email' }); (nav as any).navigate('SkillSnapshot'); }} />
          <Button title="Skip as guest" onPress={() => { track('onboarding_auth_skip'); (nav as any).navigate('SkillSnapshot'); }} />
        </View>
      )}
    >
      <ProgressStepper current={2} total={11} />
      <View style={{ gap: 8 }}>
        <Text>Email</Text>
        <TextInput placeholder="you@example.com" style={{ borderWidth: 1, padding: 8, borderRadius: 6 }} />
        <Text>Password</Text>
        <TextInput placeholder="••••••••" secureTextEntry style={{ borderWidth: 1, padding: 8, borderRadius: 6 }} />
      </View>
    </StepContainer>
  );
}
