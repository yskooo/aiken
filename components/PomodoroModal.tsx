import React from 'react';
import { View, Text, Modal, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME } from '../lib/theme';

type Props = { visible: boolean; onClose: () => void; onStart: (startedAt: string) => void };

export default function PomodoroModal({ visible, onClose, onStart }: Props) {
  const [running, setRunning] = React.useState(false);
  const [endAt, setEndAt] = React.useState<number | null>(null);
  const [remaining, setRemaining] = React.useState(0);

  React.useEffect(() => {
    let t: NodeJS.Timeout | null = null;
    if (running && endAt) {
      t = setInterval(() => {
        const now = Date.now();
        const rem = Math.max(0, Math.round((endAt - now) / 1000));
        setRemaining(rem);
        if (rem <= 0) {
          setRunning(false);
          setEndAt(null);
          Alert.alert('Pomodoro', 'Session complete');
        }
      }, 1000);
    }
    return () => { if (t) clearInterval(t); };
  }, [running, endAt]);

  React.useEffect(() => {
    // restore state from AsyncStorage
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('@aiken_pomodoro');
        if (raw) {
          const s = JSON.parse(raw);
          if (s.endAt && s.endAt > Date.now()) {
            setEndAt(s.endAt);
            setRunning(true);
          }
        }
      } catch (e) {}
    })();
  }, []);

  const start = async (mins = 25) => {
    const end = Date.now() + mins * 60000;
    setEndAt(end);
    setRunning(true);
    await AsyncStorage.setItem('@aiken_pomodoro', JSON.stringify({ endAt: end }));
    onStart(new Date().toISOString());
  };

  const reset = async () => {
    setRunning(false);
    setEndAt(null);
    setRemaining(0);
    await AsyncStorage.removeItem('@aiken_pomodoro');
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.header}>Pomodoro Timer</Text>
        <Text style={styles.timer}>{remaining > 0 ? `${Math.floor(remaining/60)}:${String(remaining%60).padStart(2,'0')}` : '25:00'}</Text>
        <View style={{marginTop:16}}>
          <Button title={running ? 'Running' : 'Start 25m'} onPress={() => void start(25)} disabled={running} color={THEME.colors.primary} />
          <View style={{height:12}} />
          <Button title="Reset" onPress={() => void reset()} />
          <View style={{height:12}} />
          <Button title="Close" onPress={onClose} color="#6B7280" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({ container:{flex:1,padding:16,backgroundColor:THEME.colors.background}, header:{fontSize:20,fontWeight:'700'}, timer:{fontSize:48,fontWeight:'700',marginTop:16} });
