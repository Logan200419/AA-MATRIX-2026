import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  Animated,
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ReelCard = ({ video, isVisible, type, index }) => {
  const [liked, setLiked] = useState(false);
  const [likeAnim] = React.useState(new Animated.Value(1));

  const player = useVideoPlayer(video.uri, (p) => {
    p.loop = true;
  });

  useEffect(() => {
    if (isVisible) {
      player.play();
    } else {
      player.pause();
    }
  }, [isVisible]);

  const handleLike = () => {
    setLiked(!liked);
    Animated.sequence([
      Animated.timing(likeAnim, { toValue: 1.3, duration: 200, useNativeDriver: true }),
      Animated.timing(likeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const isReal = type === 'REAL';
  const badgeColor = isReal ? '#00D9FF' : '#FF6B6B';
  const badgeLabel = isReal ? '✓ REAL' : '⚠ FAKE';

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="cover"
        nativeControls={false}
      />

      <View style={styles.gradientOverlay} />

      <View style={styles.topSection}>
        <View style={[styles.badge, { borderColor: badgeColor }]}>
          <View style={[styles.badgeDot, { backgroundColor: badgeColor }]} />
          <Text style={[styles.badgeText, { color: badgeColor }]}>{badgeLabel}</Text>
        </View>
      </View>

      <View style={styles.centerContent}>
        <Text style={styles.reelNumber}>#{index + 1}</Text>
      </View>

      <View style={styles.rightActions}>
        <Pressable
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
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
          <MaterialCommunityIcons name="comment-outline" size={28} color="#fff" />
          <Text style={styles.actionCount}>1.2K</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}>
          <MaterialCommunityIcons name="share-outline" size={28} color="#fff" />
          <Text style={styles.actionCount}>892</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}>
          <MaterialCommunityIcons name="music-outline" size={28} color="#fff" />
          <Text style={styles.actionLabel}>Sound</Text>
        </Pressable>
      </View>

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

        <View style={styles.videoInfo}>
          <Text style={styles.infoText}>
            {isReal ? '🎬 Authentic Content' : '🤖 AI Generated'}
          </Text>
        </View>
      </View>

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

export default ReelCard;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    // Simulated gradient via layered views if needed
  },
  topSection: {
    position: 'absolute',
    top: 50,
    right: 16,
    zIndex: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    gap: 6,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  centerContent: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
  },
  reelNumber: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '600',
  },
  rightActions: {
    position: 'absolute',
    right: 12,
    bottom: 160,
    alignItems: 'center',
    gap: 20,
    zIndex: 10,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
    padding: 4,
  },
  actionButtonPressed: {
    opacity: 0.7,
  },
  actionCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  actionLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 80,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#555',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userDetails: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  caption: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  followButton: {
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  videoInfo: {
    marginTop: 4,
  },
  infoText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: '500',
  },
  playIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    color: '#fff',
    fontSize: 22,
    marginLeft: 4,
  },
});