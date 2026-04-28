import { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { mockInference } from '@deepfake-demo/mocks';
import { useMobileInferenceStore } from '../store/inferenceStore';
import type { Post, InferenceResult } from '@deepfake-demo/types';

interface FeedCardProps {
  post: Post;
  onPress: (result: InferenceResult) => void;
}

export function FeedCard({ post, onPress }: FeedCardProps) {
  const { getResult, setResult, isLoading, setLoading } =
    useMobileInferenceStore();
  const [badge, setBadge] = useState<InferenceResult | null>(null);

  useEffect(() => {
    const checkInference = async () => {
      const cached = getResult(post.mediaUrl);
      if (cached) {
        setBadge(cached);
        return;
      }

      setLoading(post.mediaUrl, true);
      try {
        const result = await mockInference(post.mediaUrl);
        setResult(post.mediaUrl, result);
        setBadge(result);
      } catch (error) {
        console.error('Inference failed:', error);
      } finally {
        setLoading(post.mediaUrl, false);
      }
    };

    checkInference();
  }, [post.mediaUrl]);

  const handlePress = () => {
    if (badge) {
      onPress(badge);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: post.mediaUrl }} style={styles.image} />

      {isLoading(post.mediaUrl) && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="white" size="large" />
          <Text style={styles.analyzingText}>Analyzing...</Text>
        </View>
      )}

      {badge && !isLoading(post.mediaUrl) && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: badge.label === 'real' ? '#10b981' : '#ef4444',
            },
          ]}
        >
          <Text style={styles.badgeIcon}>
            {badge.label === 'real' ? '✓' : '⚠'}
          </Text>
          <View style={styles.badgeContent}>
            <Text style={styles.badgeLabel}>
              {badge.label === 'real' ? 'REAL' : 'FAKE'}
            </Text>
            <Text style={styles.badgeConfidence}>
              {Math.round(badge.confidence * 100)}%
            </Text>
          </View>
        </View>
      )}

      <View style={styles.overlay}>
        <View style={styles.postInfo}>
          <Text style={styles.author}>{post.author}</Text>
          {post.caption && <Text style={styles.caption}>{post.caption}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 800,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingText: {
    color: 'white',
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeIcon: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  badgeContent: {
    flexDirection: 'row',
    gap: 4,
  },
  badgeLabel: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  badgeConfidence: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  postInfo: {
    gap: 4,
  },
  author: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  caption: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
  },
});
