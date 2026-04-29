import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ViewToken,
} from 'react-native';
import { Video } from 'expo-video';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [reelsData, setReelsData] = useState([]);

  useEffect(() => {
    // Use provided videos or default to hardcoded videos
    setReelsData(videos && videos.length > 0 ? videos : VIDEOS);
  }, [videos]);

  const viewabilityConfig = useRef({
    waitForInteraction: false,
    viewAreaCoveragePercentThreshold: 80,
  }).current;

  const onViewableItemsChanged = useCallback(({ changed }) => {
    if (changed.length > 0) {
      const mostVisibleItem = changed.reduce((prev, current) =>
        current.isViewable && current.viewablePercent > (prev.viewablePercent || 0)
          ? current
          : prev
      );

      if (mostVisibleItem && mostVisibleItem.isViewable) {
        setCurrentIndex(mostVisibleItem.index);
        setPlayingIndex(mostVisibleItem.index);
      }
    }
  }, []);

  const keyExtractor = (item) => item.id;

  const renderReel = ({ item, index }) => {
    const isVisible = index === playingIndex;
    const type = item.name.toLowerCase().includes('fake') ? 'AI' : 'REAL';

    return (
      <ReelCard
        video={item}
        isVisible={isVisible}
        type={type}
        index={index}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reelsData}
        renderItem={renderReel}
        keyExtractor={keyExtractor}
        pagingEnabled
        snapToInterval={screenHeight}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        showsVerticalScrollIndicator={false}
        getItemLayout={(data, index) => ({
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
