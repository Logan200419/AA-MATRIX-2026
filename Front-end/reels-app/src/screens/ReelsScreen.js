import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import ReelCard from '../components/ReelCard';

const { height: screenHeight } = Dimensions.get('window');

const VIDEOS = [
  { id: '1', name: 'real-1', uri: require('./real-1.mp4') },
  { id: '2', name: 'real-2', uri: require('./real-2.mp4') },
  { id: '3', name: 'fake-1', uri: require('./fake-1.mp4') },
  { id: '4', name: 'fake-2', uri: require('./fake-2.mp4') },
  { id: '5', name: 'fake-3', uri: require('./fake-3.mp4') },
  { id: '6', name: 'fake-4', uri: require('./fake-4.mp4') },
];

export default function ReelsScreen({ videos, loading }) {
  const [playingIndex, setPlayingIndex] = useState(0);
  const [reelsData, setReelsData] = useState(VIDEOS);

  useEffect(() => {
    if (videos && videos.length > 0) {
      setReelsData(videos);
    }
  }, [videos]);

  const viewabilityConfig = useRef({
    waitForInteraction: false,
    viewAreaCoveragePercentThreshold: 80,
  }).current;

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setPlayingIndex(viewableItems[0].index);
    }
  }, []);

  const renderReel = ({ item, index }) => {
    // ✅ Match the type strings ReelCard expects
    const type = item.name.toLowerCase().includes('fake') ? 'FAKE' : 'REAL';

    return (
      <ReelCard
        video={item}
        isVisible={index === playingIndex}
        type={type}
        index={index}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reelsData}
        renderItem={renderReel}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={screenHeight}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});