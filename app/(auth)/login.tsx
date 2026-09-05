import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import NavBar from '../../components/NavBar';
import AuthButtons from '../../components/AuthButtons';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back</Text>
        <Text style={styles.sub}>Sign in to continue to Aiken</Text>
      </View>

      <AuthButtons />

      <View style={styles.bottom}>
        <Button title="Create account" onPress={() => router.push('/(auth)/signup')} />
      </View>

      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF3' },
  header: { padding: 20 },
  greeting: { fontSize: 20, fontWeight: '700' },
  sub: { color: '#6B7280', marginTop: 4 },
  bottom: { padding: 16 }
});
