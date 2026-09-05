import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CalendarEvent } from '../../types/models';
import { THEME } from '../../lib/theme';

export default function EventCard({ event }: { event: CalendarEvent }) {
  return (
    <View style={[styles.card, { backgroundColor: THEME.colors.card }]}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.time}>{new Date(event.start).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 8,
    borderRadius: 12,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6
  },
  title: { fontWeight: '700', color: THEME.colors.text },
  time: { color: '#6B7280', marginTop: 4 }
});
