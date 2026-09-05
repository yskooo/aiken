import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSession } from '../lib/auth';

export default function AuthButtons() {
  const { signIn } = useSession();
  const [email, setEmail] = React.useState('student@example.com');
  const [password, setPassword] = React.useState('password');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign in (mock)" onPress={() => void signIn(email, password)} />
      <View style={{ height: 12 }} />
      <Button title="Sign in with Google (mock)" onPress={() => void signIn('student@example.com', 'google')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 8, color: '#374151' },
  input: { borderWidth: 1, borderColor: '#E5E7EB', padding: 8, borderRadius: 8, marginTop: 4 }
});
