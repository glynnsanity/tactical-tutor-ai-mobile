import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Crown, MessageCircle, BarChart3, BookOpen, PlayCircle, Settings as SettingsIcon } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoachHome from './src/screens/CoachHome';
import AskCoach from './src/screens/AskCoach';
import GameReview from './src/screens/GameReview';
import Progress from './src/screens/Progress';
import StudyPlan from './src/screens/StudyPlan';
import OnboardingStack from './src/navigation/OnboardingStack';
import Settings from './src/screens/Settings';

const Tab = createBottomTabNavigator();

const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

export default function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
      setIsOnboardingComplete(onboardingComplete === '1');
    } catch (error) {
      console.error('Failed to check onboarding status:', error);
      setIsOnboardingComplete(false);
    }
  };

  if (isOnboardingComplete === null) {
    // Show loading state or splash screen while checking
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={AppTheme}>
        <StatusBar style="dark" />
        {isOnboardingComplete ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: '#111827',
              tabBarInactiveTintColor: '#6b7280',
              tabBarStyle: { borderTopColor: '#e5e7eb' },
              tabBarIcon: ({ color, size }) => {
                switch (route.name) {
                  case 'Home':
                    return <Crown color={color} size={size} />;
                  case 'Ask':
                    return <MessageCircle color={color} size={size} />;
                  case 'Review':
                    return <PlayCircle color={color} size={size} />;
                  case 'Progress':
                    return <BarChart3 color={color} size={size} />;
                  case 'Study':
                    return <BookOpen color={color} size={size} />;
                  case 'Settings':
                    return <SettingsIcon color={color} size={size} />;
                  default:
                    return null;
                }
              },
            })}
          >
            <Tab.Screen name="Home" component={CoachHome} />
            <Tab.Screen name="Ask" component={AskCoach} />
            <Tab.Screen name="Review" component={GameReview} />
            <Tab.Screen name="Progress" component={Progress} />
            <Tab.Screen name="Study" component={StudyPlan} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        ) : (
          <OnboardingStack />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
