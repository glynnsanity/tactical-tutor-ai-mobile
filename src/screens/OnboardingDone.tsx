import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, radii, shadows } from '../theme';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

export default function OnboardingDone({ navigation }: Props) {
  const handleStartDaily10 = useCallback(async () => {
    try {
      await AsyncStorage.setItem('onboardingComplete', '1');
      // Reset navigation to Home - this will trigger the first-run gate in App.tsx
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  }, [navigation]);

  const handleSkillCheck = useCallback(async () => {
    try {
      await AsyncStorage.setItem('onboardingComplete', '1');
      // Reset navigation to Home - this will trigger the first-run gate in App.tsx
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>You're all set! 🎉</Text>
          <Text style={styles.subtitle}>
            Ready to start improving your chess tactics? Choose how you'd like to begin.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleStartDaily10}
            accessibilityRole="button"
            accessibilityLabel="Start daily 10 puzzles"
          >
            <Text style={styles.primaryButtonText}>Start daily 10</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSkillCheck}
            accessibilityRole="button"
            accessibilityLabel="Try a 2-puzzle skill check"
          >
            <Text style={styles.secondaryButtonText}>Try a 2-puzzle skill check</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Both options will help us understand your current level and create a personalized training plan.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing(6),
    paddingTop: spacing(8),
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing(8),
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing(4),
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: colors.mutedText,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: spacing(8),
    gap: spacing(4),
  },
  primaryButton: {
    backgroundColor: colors.coachPrimary,
    borderRadius: radii.md,
    paddingVertical: spacing(4),
    paddingHorizontal: spacing(6),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    ...shadows.card,
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radii.md,
    paddingVertical: spacing(4),
    paddingHorizontal: spacing(6),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.mutedText,
    textAlign: 'center',
    lineHeight: 20,
  },
});
