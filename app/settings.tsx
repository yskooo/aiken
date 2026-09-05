import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import { useSession } from '../lib/auth';
import NavBar from '../components/NavBar';

export default function Settings() {
  const { session, signOut } = useSession();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.sub}>Manage connected platforms and session</Text>
      </View>

      <View style={{ padding: 16 }}>
        <Text style={{ marginBottom: 8 }}>Signed in as:</Text>
        <Text style={{ fontWeight: '600' }}>{session?.user?.email}</Text>
        <View style={{ height: 12 }} />
        <Button title="Disconnect Google Classroom (mock)" onPress={() => alert('Mock: toggled')} />
        <View style={{ height: 12 }} />
        <Button title="Log out" onPress={() => void signOut()} color="#B4232A" />
      </View>

      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF3' },
  header: { padding: 20 },
  title: { fontSize: 22, fontWeight: '700' },
  sub: { color: '#6B7280', marginTop: 4 }
});
