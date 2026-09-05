import React from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { THEME } from '../lib/theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreate: (payload: { title: string; start: string; end: string; type?: string }) => void;
};

export default function AddEventModal({ visible, onClose, onCreate }: Props) {
  const [title, setTitle] = React.useState('New Event');
  const [date, setDate] = React.useState(new Date());
  const [durationMins, setDurationMins] = React.useState(60);

  const startISO = date.toISOString();
  const endISO = new Date(date.getTime() + durationMins * 60000).toISOString();

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.header}>Add Event</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <View style={{ marginVertical: 8 }}>
          <Text style={{ marginBottom: 8 }}>Start</Text>
          {Platform.OS === 'web' ? (
            <input type="datetime-local" value={date.toISOString().slice(0, 16)} onChange={() => {}} />
          ) : (
            <DateTimePicker value={date} mode="datetime" display="default" onChange={(_e, d) => d && setDate(d)} />
          )}
        </View>

        <Text style={{ marginTop: 8 }}>Duration (minutes)</Text>
        <TextInput style={styles.input} value={String(durationMins)} onChangeText={(t) => setDurationMins(Number(t) || 0)} keyboardType="numeric" />

        <View style={{ marginTop: 16 }}>
          <Button title="Add Event" color={THEME.colors.primary} onPress={() => onCreate({ title, start: startISO, end: endISO })} />
          <View style={{ height: 8 }} />
          <Button title="Cancel" onPress={onClose} color="#6B7280" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: THEME.colors.background },
  header: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', padding: 8, borderRadius: 8 }
});
