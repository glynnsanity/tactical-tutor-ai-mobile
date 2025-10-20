import React from 'react';
import { View, Button } from 'react-native';
import StepContainer from '../components/StepContainer';
import ProgressStepper from '../components/ProgressStepper';
import { useNavigation } from '@react-navigation/native';
import { track } from '../../../lib/analytics';

export default function PermissionsScreen() {
  const nav = useNavigation();
  return (
    <StepContainer
      title="Permissions"
      subtitle="Enable notifications to get daily 10-minute plans."
      footer={(
        <View style={{ gap: 8 }}>
          <Button title="Continue" onPress={() => (nav as any).navigate('Tour')} />
          <Button title="Skip" onPress={() => (nav as any).navigate('Tour')} />
        </View>
      )}
    >
      <ProgressStepper current={9} total={11} />
      <View style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 16 }}>
        <Button title="Enable notifications" onPress={() => { track('permission_prompt_shown', { type: 'notifications' }); }} />
      </View>
    </StepContainer>
  );
}
