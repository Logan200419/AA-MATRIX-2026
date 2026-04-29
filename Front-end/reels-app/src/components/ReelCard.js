import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  Animated,
} from 'react-native';
import { Video } from 'expo-video';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ReelCard = ({ video, isVisible, type, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeAnim] = React.useState(new Animated.Value(1));
  const videoRef = React.useRef(null);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play?.();
    } else {
      setIsPlaying(false);
      videoRef.current?.pause?.();
    }
  }, [isVisible]);

  const handleLike = () => {
    setLiked(!liked);
    Animated.sequence([
      Animated.timing(likeAnim, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const isReal = type === 'REAL';
  const badgeColor = isReal ? '#00D9FF' : '#FF6B6B';
  const badgeLabel = isReal ? '✓ REAL' : '⚠ FAKE';

  return (
    <View style={styles.container}>
      {/* Video Background */}
      <Video
        ref={videoRef}
        source={video.uri}
        style={styles.video}
        resizeMode="cover"
        isLooping
        shouldPlay={isVisible}
        useNativeControls={false}
        progressUpdateIntervalMillis={500}
      />

      {/* Gradient Overlay */}
      <View style={styles.gradientOverlay} />

      {/* Top Section - Badge */}
      <View style={styles.topSection}>
        <View style={[styles.badge, { borderColor: badgeColor }]}>
          <View style={[styles.badgeDot, { backgroundColor: badgeColor }]} />
          <Text style={[styles.badgeText, { color: badgeColor }]}>
            {badgeLabel}
          </Text>
        </View>
      </View>

      {/* Center - Reel Number */}
      <View style={styles.centerContent}>
        <Text style={styles.reelNumber}>#{index + 1}</Text>
      </View>

      {/* Right Side - Action Buttons */}
      <View style={styles.rightActions}>
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}
          onPress={handleLike}
        >
          <Animated.View style={{ transform: [{ scale: likeAnim }] }}>
            <MaterialCommunityIcons
              name={liked ? 'heart' : 'heart-outline'}
              size={28}
              color={liked ? '#FF6B6B' : '#fff'}
            />
          </Animated.View>
          <Text style={styles.actionCount}>245K</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}>
          <MaterialCommunityIcons
            name="comment-outline"
            size={28}
            color="#fff"
          />
          <Text style={styles.actionCount}>1.2K</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}>
          <MaterialCommunityIcons
            name="share-outline"
            size={28}
            color="#fff"
          />
          <Text style={styles.actionCount}>892</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}>
          <MaterialCommunityIcons
            name="music-outline"
            size={28}
            color="#fff"
          />
          <Text style={styles.actionLabel}>Sound</Text>
        </Pressable>
      </View>

      {/* Bottom Section - Info */}
      <View style={styles.bottomSection}>
        <View style={styles.userInfo}>
          <View style={styles.userAvatar} />
          <View style={styles.userDetails}>
            <Text style={styles.username}>@creator_{index + 1}</Text>
            <Text style={styles.caption} numberOfLines={2}>
              Check out this {isReal ? 'authentic' : 'AI-generated'} video
            </Text>
          </View>
          <Pressable style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </Pressable>
        </View>

        {/* Video Info */}
        <View style={styles.videoInfo}>
          <Text style={styles.infoText}>
            {isReal ? '🎬 Authentic Content' : '🤖 AI Generated'}
          </Text>
        </View>
      </View>

      {/* Play Indicator */}
      {!isVisible && (
        <View style={styles.playIndicator}>
          <View style={styles.playButton}>
            <Text style={styles.playText}>▶</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topSection: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    backdropFilter: 'blur(10px)',
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  centerContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -30,
    marginTop: -40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  reelNumber: {
    fontSize: 64,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.1)',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  rightActions: {
    position: 'absolute',
    bottom: 100,
    right: 12,
    zIndex: 10,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginVertical: 12,
    padding: 8,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    minWidth: 50,
  },
  actionButtonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transform: [{ scale: 0.95 }],
  },
  actionCount: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  actionLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
    paddingBottom: 20,
    paddingHorizontal: 12,
    paddingTop: 40,
    zIndex: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  caption: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    lineHeight: 16,
  },
  followButton: {
    backgroundColor: '#00D9FF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
  videoInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  infoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  playIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -35,
    marginTop: -35,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 8,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default ReelCard;
