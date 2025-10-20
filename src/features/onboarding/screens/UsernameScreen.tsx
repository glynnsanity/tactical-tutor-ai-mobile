import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import StepContainer from '../components/StepContainer';
import ProgressStepper from '../components/ProgressStepper';
import { useNavigation } from '@react-navigation/native';
import { useOnboardingStore } from '../store/onboardingStore';
import { track } from '../../../lib/analytics';

export default function UsernameScreen() {
  const nav = useNavigation();
  const { chessComUsername, set } = useOnboardingStore();
  const [name, setName] = React.useState(chessComUsername || '');
  const onNext = () => {
    set({ chessComUsername: name.trim() || undefined });
    track('onboarding_username_saved', { platform: 'chess.com', username: name.trim() || undefined });
    (nav as any).navigate('Done');
  };
  return (
    <StepContainer
      title="Connect Chess.com"
      subtitle="Enter your Chess.com username to personalize training."
      footer={(
        <View style={{ gap: 8 }}>
          <Button title="Continue" onPress={onNext} />
          <Button title="Skip" onPress={() => (nav as any).navigate('Done')} />
        </View>
      )}
    >
      <ProgressStepper current={3} total={4} />
      <Text style={{ marginBottom: 8 }}>Chess.com username</Text>
      <TextInput value={name} onChangeText={setName} autoCapitalize="none" autoCorrect={false} placeholder="e.g. MagnusCarlsen" style={{ borderWidth: 1, borderRadius: 6, padding: 8 }} />
      <Text style={{ color: '#6b7280', marginTop: 8 }}>We only use this to fetch your public games.</Text>
    </StepContainer>
  );
}
