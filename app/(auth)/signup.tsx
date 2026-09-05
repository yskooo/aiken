import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button, TextInput } from 'react-native';
import { useSession } from '../../lib/auth';
import { useRouter } from 'expo-router';

export default function Signup() {
  const { signUp } = useSession();
  const [name, setName] = React.useState('Demo Student');
  const [email, setEmail] = React.useState('student@example.com');
  const [password, setPassword] = React.useState('password');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Create account</Text>
        <Text style={styles.sub}>Register to use Aiken</Text>
      </View>

      <View style={{ padding: 16 }}>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
        <Button title="Sign up (mock)" onPress={() => void signUp(name, email, password)} />
        <View style={{ height: 12 }} />
        <Button title="Back to login" onPress={() => router.push('/(auth)/login')} />
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
  input: { borderWidth: 1, borderColor: '#E5E7EB', padding: 8, borderRadius: 8, marginVertical: 8 }
});
