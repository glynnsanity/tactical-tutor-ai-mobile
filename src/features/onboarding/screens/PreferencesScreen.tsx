import React from 'react';
import { View, Text, Button, Switch } from 'react-native';
import StepContainer from '../components/StepContainer';
import ProgressStepper from '../components/ProgressStepper';
import { useNavigation } from '@react-navigation/native';

export default function PreferencesScreen() {
  const nav = useNavigation();
  const [timeControls, setTimeControls] = React.useState<string[]>([]);
  const toggleTime = (t: string) => setTimeControls(timeControls.includes(t) ? timeControls.filter(x => x !== t) : [...timeControls, t]);
  return (
    <StepContainer
      title="Preferences"
      subtitle="Choose time controls and theme."
      footer={(
        <View style={{ gap: 8 }}>
          <Button title="Continue" onPress={() => (nav as any).navigate('ImportGames')} />
          <Button title="Skip" onPress={() => (nav as any).navigate('ImportGames')} />
        </View>
      )}
    >
      <ProgressStepper current={5} total={11} />
      <Text style={{ fontWeight: '600', marginBottom: 8 }}>Time controls</Text>
      {['Blitz','Rapid','Classical'].map(tc => (
        <View key={tc} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6 }}>
          <Text>{tc}</Text>
          <Switch value={timeControls.includes(tc)} onValueChange={() => toggleTime(tc)} />
        </View>
      ))}
    </StepContainer>
  );
}
