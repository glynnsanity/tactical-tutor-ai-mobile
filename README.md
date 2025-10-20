# Tactical Tutor AI Mobile

A minimal, delightful onboarding flow for a chess tactics app that educates briefly and captures a Chess.com username.

## Features

- **OnboardingIntro**: 3 horizontally paged cards explaining the app's value proposition
- **ChessComUsername**: Text input with validation and Chess.com API integration
- **OnboardingDone**: Completion screen with options to start training

## Tech Stack

- **Expo** (React Native, TypeScript)
- **React Navigation** (Native Stack)
- **AsyncStorage** for persistent storage
- **NetInfo** for network connectivity detection
- **Chess.com API** for username validation

## Installation

1. **Prerequisites**
   - Node.js (v16 or higher)
   - npm or yarn
   - Expo CLI: `npm install -g @expo/cli`

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## Running the App

### Development

```bash
# Start the Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### Production Build

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

## Project Structure

```
src/
├── screens/
│   ├── OnboardingIntro.tsx      # 3-card introduction with pager
│   ├── ChessComUsername.tsx     # Username input with Chess.com API
│   └── OnboardingDone.tsx       # Completion screen
├── navigation/
│   └── OnboardingStack.tsx      # Navigation stack for onboarding
├── components/
│   └── ui/                      # Reusable UI components
├── theme.ts                     # Design system (colors, spacing, etc.)
└── lib/
    └── analytics.ts             # Analytics utilities
```

## Onboarding Flow

1. **OnboardingIntro**: Users see 3 cards explaining the app's value
2. **ChessComUsername**: Users can connect their Chess.com account or skip
3. **OnboardingDone**: Users choose to start daily training or take a skill check

## Chess.com Integration

The app validates Chess.com usernames using their public API:
- Validates username format with regex
- Checks if user exists via API call
- Stores username and avatar in AsyncStorage
- Handles offline scenarios gracefully

## Accessibility

- All interactive elements have proper `accessibilityRole` and `accessibilityLabel`
- Input errors are announced via visible text
- Buttons meet minimum 44px height requirement
- Keyboard avoidance on iOS

## Error Handling

- Network connectivity detection
- API error handling (404, 5xx, network failures)
- Debounced API requests
- Graceful offline handling

## Configuration

The app uses AsyncStorage to persist:
- `onboardingComplete`: '1' when onboarding is finished
- `chesscom.username`: Chess.com username
- `chesscom.avatar`: Chess.com avatar URL

## Development Notes

- Uses TypeScript for type safety
- Follows React Native best practices
- Implements proper error boundaries
- Respects iOS safe areas and keyboard avoidance
- Clean, minimal UI with neutral color palette

## Future Enhancements

- PGN import functionality
- Skill check implementation
- Analytics integration
- Push notification setup
- Account creation flow