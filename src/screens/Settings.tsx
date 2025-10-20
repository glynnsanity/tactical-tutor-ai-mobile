import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radii } from '../theme';

export default function Settings() {
  const [username, setUsername] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const u = await AsyncStorage.getItem('chesscom.username');
        if (u) setUsername(u);
      } catch {}
    })();
  }, []);

  const onSave = async () => {
    const trimmed = username.trim();
    if (!trimmed) {
      Alert.alert('Username required', 'Please enter your Chess.com username.');
      return;
    }
    setSaving(true);
    try {
      await AsyncStorage.setItem('chesscom.username', trimmed);
      Alert.alert('Saved', 'Your Chess.com username has been saved.');
    } catch (e) {
      Alert.alert('Error', 'Unable to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ padding: spacing(6) }} keyboardShouldPersistTaps="handled">
          <View style={{ marginBottom: spacing(6) }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: spacing(2) }}>Settings</Text>
            <Text style={{ color: colors.mutedText }}>Connect your Chess.com account so the coach can analyze your games.</Text>
          </View>

          <View style={{ marginBottom: spacing(4) }}>
            <Text style={{ color: colors.text, fontWeight: '600', marginBottom: spacing(2) }}>Chess.com username</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="e.g. magnuscarlsen"
              placeholderTextColor={colors.mutedText}
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                borderWidth: 1,
                borderColor: colors.cardBorder,
                backgroundColor: colors.cardBg,
                borderRadius: radii.md,
                paddingHorizontal: spacing(4),
                paddingVertical: spacing(3),
                color: colors.text,
                fontSize: 16,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={onSave}
            disabled={saving}
            style={{
              backgroundColor: colors.coachPrimary,
              borderRadius: radii.md,
              paddingVertical: spacing(3),
              alignItems: 'center',
            }}
            accessibilityRole="button"
            accessibilityLabel="Save Chess.com username"
          >
            <Text style={{ color: colors.background, fontSize: 16, fontWeight: '600' }}>{saving ? 'Saving...' : 'Save'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


