import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import type { InferenceResult } from '@deepfake-demo/types';

export default function DetailScreen() {
  const { result } = useLocalSearchParams<{ result: string }>();
  const router = useRouter();

  if (!result) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>No result data</Text>
      </SafeAreaView>
    );
  }

  const data: InferenceResult = JSON.parse(result);
  const isReal = data.label === 'real';
  const confidencePercent = Math.round(data.confidence * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { borderTopColor: isReal ? '#10b981' : '#ef4444' }]}>
          <View style={styles.resultSection}>
            <View
              style={[
                styles.icon,
                { backgroundColor: isReal ? '#d1fae5' : '#fee2e2' },
              ]}
            >
              <Text style={styles.iconText}>{isReal ? '✓' : '⚠'}</Text>
            </View>
            <Text style={[styles.label, { color: isReal ? '#10b981' : '#ef4444' }]}>
              {isReal ? 'AUTHENTIC' : 'DEEPFAKE DETECTED'}
            </Text>
          </View>

          <View style={styles.confidenceSection}>
            <View style={styles.confidenceHeader}>
              <Text style={styles.confidenceLabel}>Confidence Score</Text>
              <Text style={styles.confidencePercent}>{confidencePercent}%</Text>
            </View>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: isReal ? '#d1fae5' : '#fee2e2' },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${confidencePercent}%`,
                    backgroundColor: isReal ? '#10b981' : '#ef4444',
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Model Version</Text>
              <Text style={styles.detailValue}>{data.modelVersion}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Timestamp</Text>
              <Text style={styles.detailValue}>
                {new Date(data.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          </View>

          {data.details?.artifactDetected &&
            data.details.artifactDetected.length > 0 && (
              <View style={styles.artifactsSection}>
                <Text style={styles.sectionTitle}>🔍 Detected Artifacts</Text>
                {data.details.artifactDetected.map((artifact, idx) => (
                  <Text key={idx} style={styles.artifactItem}>
                    • {artifact}
                  </Text>
                ))}
              </View>
            )}

          {data.details?.keyFrameAnalysis && (
            <View style={styles.analysisSection}>
              <Text style={styles.sectionTitle}>📊 Analysis Summary</Text>
              <Text style={styles.analysisText}>
                {data.details.keyFrameAnalysis}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>← Back to Feed</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 20,
    borderTopWidth: 4,
    marginBottom: 16,
  },
  resultSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 40,
    fontWeight: '700',
  },
  label: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  confidenceSection: {
    marginBottom: 24,
  },
  confidenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  confidenceLabel: {
    color: '#d1d5db',
    fontSize: 14,
    fontWeight: '500',
  },
  confidencePercent: {
    color: '#f3f4f6',
    fontSize: 18,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  detailsGrid: {
    gap: 12,
    marginBottom: 24,
  },
  detailItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 8,
  },
  detailLabel: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  detailValue: {
    color: '#f3f4f6',
    fontSize: 14,
    fontWeight: '600',
  },
  artifactsSection: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#ef4444',
    borderRadius: 6,
    marginBottom: 16,
  },
  analysisSection: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
    borderRadius: 6,
  },
  sectionTitle: {
    color: '#f3f4f6',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  artifactItem: {
    color: '#d1d5db',
    fontSize: 13,
    marginBottom: 4,
  },
  analysisText: {
    color: '#d1d5db',
    fontSize: 13,
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#f3f4f6',
    fontSize: 16,
    textAlign: 'center',
  },
});
