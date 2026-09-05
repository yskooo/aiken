import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SmallBarChart({ data = [] as number[] }: { data: number[] }) {
  const max = Math.max(1, ...data);
  return (
    <View style={styles.row}>
      {data.map((v, i) => (
        <View key={i} style={styles.colContainer}>
          <View style={[styles.bar, { height: `${(v / max) * 100}%` }]} />
          <Text style={styles.label}>{v}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', height: 120, paddingHorizontal: 12 },
  colContainer: { flex: 1, alignItems: 'center', marginHorizontal: 6 },
  bar: { width: '100%', backgroundColor: '#F2A93B', borderRadius: 6 },
  label: { marginTop: 6 }
});
