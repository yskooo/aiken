import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, RefreshControl, Button } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import EventCard from '../../components/EventCard';
import AddEventModal from '../../components/AddEventModal';
import NavBar from '../../components/NavBar';
import type { CalendarEvent } from '../../types/models';

export default function WeekView() {
  const qc = useQueryClient();
  const { data, isLoading, refetch } = useQuery(['events'], async () => {
    const res = await api.get('/events');
    return res.data.events as CalendarEvent[];
  });

  const [refreshing, setRefreshing] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const onCreate = async (payload: { title: string; start: string; end: string }) => {
    // For Phase 2 we create immediately (will be gated behind HITL in Phase 5)
    await api.post('/events', { ...payload, userId: 'user_1', type: 'custom' });
    await qc.invalidateQueries(['events']);
    setShowAdd(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning, Student 👋</Text>
        <Text style={styles.sub}>Week view</Text>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={() => <Text style={{ color: '#9CA3AF' }}>No events</Text>}
      />

      <View style={styles.addButton}>
        <Button title="Add Event" onPress={() => setShowAdd(true)} color={THEME.colors.primary} />
      </View>

      <AddEventModal visible={showAdd} onClose={() => setShowAdd(false)} onCreate={onCreate} />

      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF3' },
  header: { padding: 20 },
  greeting: { fontSize: 20, fontWeight: '700' },
  sub: { color: '#6B7280', marginTop: 4 },
  addButton: { padding: 16 }
});
