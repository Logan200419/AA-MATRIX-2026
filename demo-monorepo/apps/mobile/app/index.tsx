import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useMobileAuthStore } from '../store/authStore';
import { useMobileInferenceStore } from '../store/inferenceStore';
import { FeedCard } from '../components/FeedCard';
import { mockPosts } from '@deepfake-demo/mocks';
import type { InferenceResult } from '@deepfake-demo/types';

export default function FeedScreen() {
  const router = useRouter();
  const { user, logout } = useMobileAuthStore();
  const [selectedResult, setSelectedResult] = useState<InferenceResult | null>(
    null
  );

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login');
  };

  const handleSelectResult = (result: InferenceResult) => {
    setSelectedResult(result);
    router.push({
      pathname: '/detail',
      params: {
        result: JSON.stringify(result),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DeepfakeDetect</Text>
        <View style={styles.headerRight}>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedCard post={item} onPress={handleSelectResult} />
        )}
        snapToInterval={812}
        decelerationRate="fast"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#1f2937',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userEmail: {
    color: '#d1d5db',
    fontSize: 12,
  },
  logoutBtn: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  logoutText: {
    color: '#f3f4f6',
    fontSize: 12,
    fontWeight: '500',
  },
  listContent: {
    paddingVertical: 12,
  },
});
