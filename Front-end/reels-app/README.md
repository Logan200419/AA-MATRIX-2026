# Content Verification - Reels Application

A sophisticated React Native application built with Expo that showcases an Instagram-like vertical scrolling reels interface with AI/Real content detection.

## Features

✨ **Impressive UI/UX**
- Instagram-style vertical scrolling interface
- Smooth full-screen video transitions
- Beautiful gradient overlays and transitions
- Professional dark mode design

🎯 **Content Detection**
- AI-generated vs Authentic content indicator badge
- Color-coded badges (Red for AI, Green for Authentic)
- Real-time badge display on top-right corner

📱 **Engagement Features**
- Like button with dynamic counter
- Comment count display
- Share functionality indicator
- Save/bookmark feature
- Creator profile information

🎬 **Video Playback**
- Native video player with autoplay
- Infinite looping support
- Optimized video streaming
- Automatic pause/resume based on visibility

⚡ **Performance**
- Optimized FlatList with virtualization
- Smooth 60fps scrolling animation
- Efficient memory management
- Fast video switching

## Project Structure

```
reels-app/
├── App.js                    # Main application entry point
├── assets/
│   └── videos/              # Video files
│       ├── fake-1.mp4
│       ├── fake-2.mp4
│       ├── fake-3.mp4
│       ├── fake-4.mp4
│       ├── real-1.mp4
│       └── real-2.mp4
├── src/
│   ├── screens/
│   │   └── ReelsScreen.js   # Main reels display screen
│   └── components/
│       └── ReelCard.js      # Individual reel card component
└── app.json                 # Expo configuration
```

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI

### Install Dependencies
```bash
cd reels-app
npm install
```

### Run the Application

**For Web (Testing)**
```bash
npm run web
```

**For iOS**
```bash
npm run ios
```

**For Android**
```bash
npm run android
```

## Technologies Used

- **React Native** - Native mobile application framework
- **Expo** - React Native development platform
- **expo-video** - Video playback component
- **expo-linear-gradient** - Gradient UI elements
- **react-native-reanimated** - Smooth animations

## Key Components

### App.js
- Video loading from local assets
- Application state management
- Safe area handling

### ReelsScreen.js
- FlatList implementation for smooth scrolling
- Viewability tracking for video playback
- Snap-to-scroll behavior

### ReelCard.js
- Individual video card component
- AI/Real badge system
- Engagement buttons (Like, Comment, Share, Save)
- User info display
- Gradient overlays

## Features Breakdown

### Badge System
- **AI Badge**: Red (#FF4444) - Indicates AI-generated content
- **REAL Badge**: Green (#00D966) - Indicates authentic/genuine content

### Action Buttons (Right Side)
- ❤️ **Like**: Toggle like and view like count
- 💬 **Comment**: View comment count
- ↗️ **Share**: Share functionality indicator
- 🔖 **Save**: Save/bookmark indicator

### Bottom Creator Info
- Creator profile icon
- Creator name/ID
- Content description/caption

## Styling & Design

- **Color Scheme**: Dark mode with vibrant accents
- **Typography**: Modern, bold fonts with proper hierarchy
- **Animations**: Smooth transitions and interactive feedback
- **Accessibility**: Touch-friendly button sizes (50x50 minimum)

## Performance Optimizations

1. **Virtualization**: Only renders visible items
2. **Video Management**: Auto-plays visible video, pauses others
3. **Memory Efficient**: Proper ref cleanup
4. **Smooth Scrolling**: 60fps animation with deceleration
5. **Asset Optimization**: Local video storage

## Browser/Device Support

- iOS 13+
- Android 9+
- Web browsers (Chrome, Safari, Firefox)

## Future Enhancements

- [ ] Video upload functionality
- [ ] User authentication
- [ ] Comment system integration
- [ ] Share to social media
- [ ] Advanced content filtering
- [ ] Analytics tracking
- [ ] Notification system
- [ ] User profiles and follows

## License

Proprietary - All rights reserved

## Support

For issues or questions, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: April 29, 2026

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
