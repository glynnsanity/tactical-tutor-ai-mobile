import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import TourScreen from '../screens/TourScreen';
import UsernameScreen from '../screens/UsernameScreen';
import DoneScreen from '../screens/DoneScreen';

export type OnboardingStackParamList = {
  Welcome: undefined;
  Tour: undefined;
  Username: undefined;
  Done: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Tour" component={TourScreen} />
      <Stack.Screen name="Username" component={UsernameScreen} />
      <Stack.Screen name="Done" component={DoneScreen} />
    </Stack.Navigator>
  );
}
