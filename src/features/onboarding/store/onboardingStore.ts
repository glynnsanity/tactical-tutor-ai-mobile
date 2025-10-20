import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export interface OnboardingState {
  onboarded: boolean;
  step: number;
  chessComUsername?: string;
  set: (patch: Partial<OnboardingState>) => void;
  reset: () => void;
}

const STORAGE_KEY = 'ttai_onboarding_v1';

async function load() {
  try { const raw = await SecureStore.getItemAsync(STORAGE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
async function save(state: OnboardingState) {
  try { await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify({ onboarded: state.onboarded, step: state.step, chessComUsername: state.chessComUsername })); } catch {}
}

const initial: OnboardingState = { onboarded: false, step: 0, chessComUsername: undefined, set: () => {}, reset: () => {} };

export const useOnboardingStore = create<OnboardingState>((set, get) => {
  const setState = (patch: Partial<OnboardingState>) => { const next = { ...get(), ...patch }; set(next as any); save(next as OnboardingState); };
  const reset = () => { const next = { ...initial, set: setState, reset } as OnboardingState; set(next); save(next); };
  load().then((p) => { if (p) set({ ...get(), ...p }); });
  return { ...initial, set: setState, reset };
});
