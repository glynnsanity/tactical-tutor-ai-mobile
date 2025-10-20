import React from 'react';
import { View, Text, Button, Switch } from 'react-native';
import StepContainer from '../components/StepContainer';
import ProgressStepper from '../components/ProgressStepper';
import { useNavigation } from '@react-navigation/native';

export default function GoalsScreen() {
  const nav = useNavigation();
  const [goals, setGoals] = React.useState({ fewerBlunders: false, improveTactics: false, manageTime: false, openingPrep: false, endgameBasics: false });
  const toggle = (k: keyof typeof goals) => setGoals({ ...goals, [k]: !goals[k] });
  return (
    <StepContainer
      title="Your goals"
      subtitle="Pick a few areas to focus on."
      footer={(
        <View style={{ gap: 8 }}>
          <Button title="Continue" onPress={() => (nav as any).navigate('Preferences')} />
          <Button title="Skip" onPress={() => (nav as any).navigate('Preferences')} />
        </View>
      )}
    >
      <ProgressStepper current={4} total={11} />
      {([
        ['fewerBlunders', 'Fewer blunders'],
        ['improveTactics', 'Improve tactics'],
        ['manageTime', 'Manage time better'],
        ['openingPrep', 'Opening prep'],
        ['endgameBasics', 'Endgame basics'],
      ] as [keyof typeof goals, string][]).map(([key, label]) => (
        <View key={key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
          <Text>{label}</Text>
          <Switch value={goals[key]} onValueChange={() => toggle(key)} />
        </View>
      ))}
    </StepContainer>
  );
}
