import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import NavBar from '../components/NavBar';
import { THEME } from '../lib/theme';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning, Student 👋</Text>
        <Text style={styles.sub}>Welcome to Aiken</Text>
      </View>

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Week grid / Month view will render here (Phase 2)</Text>
      </View>

      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.background },
  header: { padding: 20 },
  greeting: { fontSize: 20, fontWeight: '700', color: THEME.colors.text },
  sub: { color: '#6B7280', marginTop: 4 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#9CA3AF' }
});
