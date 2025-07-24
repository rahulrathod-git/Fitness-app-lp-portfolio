# CoachingApp - Setup Guide

## Prerequisites

- **Node.js** (v16+): Download from [nodejs.org](https://nodejs.org/)
- **Expo Go** app on your phone: [iOS App Store](https://apps.apple.com/app/expo-go/id982107779) | [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Quick Start

```bash
# Clone and setup
git clone https://github.com/your-username/coaching-app-mobile.git
cd coaching-app-mobile
npm install

# Run the app
npx expo start
```

**On your phone:** Open Expo Go → Scan the QR code from your terminal

## Troubleshooting

**QR code not working?**
```bash
npx expo start --tunnel
```

**Metro bundler issues?**
```bash
npx expo start --clear
```

**Still having problems?**
- Ensure phone and computer are on same WiFi
- In Expo Go, manually enter the URL shown in terminal
- Try restarting the Expo Go app

---
*Built with React Native + Expo. 