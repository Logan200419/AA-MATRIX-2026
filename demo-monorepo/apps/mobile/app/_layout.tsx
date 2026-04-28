import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useMobileAuthStore } from '../store/authStore';

export default function RootLayout() {
  const { user, restoreAuth } = useMobileAuthStore();

  useEffect(() => {
    restoreAuth();
  }, []);

  return (
    <Stack>
      {!user ? (
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen
            name="index"
            options={{
              title: 'DeepfakeDetect',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="detail"
            options={{
              title: 'Analysis Result',
            }}
          />
        </>
      )}
    </Stack>
  );
}