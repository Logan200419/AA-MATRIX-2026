import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReelsScreen from './src/screens/ReelsScreen';

const VIDEOS = [
  { id: '1', name: 'fake-1', uri: require('./assets/videos/fake-1.mp4'), type: 'fake' },
  { id: '2', name: 'fake-2', uri: require('./assets/videos/fake-2.mp4'), type: 'fake' },
  { id: '3', name: 'fake-3', uri: require('./assets/videos/fake-3.mp4'), type: 'fake' },
  { id: '4', name: 'fake-4', uri: require('./assets/videos/fake-4.mp4'), type: 'fake' },
  { id: '5', name: 'real-1', uri: require('./assets/videos/real-1.mp4'), type: 'real' },
  { id: '6', name: 'real-2', uri: require('./assets/videos/real-2.mp4'), type: 'real' },
];

export default function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // require() is synchronous, no need for async
    setVideos(VIDEOS);
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
        translucent={false}
      />
      <ReelsScreen videos={videos} loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});