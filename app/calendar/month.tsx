import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import EventCard from '../../components/EventCard';
import NavBar from '../../components/NavBar';
import type { CalendarEvent } from '../../types/models';

export default function MonthView() {
  const { data } = useQuery(['events'], async () => {
    const res = await api.get('/events');
    return res.data.events as CalendarEvent[];
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Schedule Calendar</Text>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        ListEmptyComponent={() => <Text style={{ color: '#9CA3AF' }}>No events</Text>}
      />

      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF3' },
  header: { padding: 20 },
  greeting: { fontSize: 20, fontWeight: '700' }
});
