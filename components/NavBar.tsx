import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../lib/theme';

export default function NavBar() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>Handbook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>Aiken</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingHorizontal: 16,
    backgroundColor: THEME.colors.card,
    borderTopLeftRadius: THEME.radii.xl,
    borderTopRightRadius: THEME.radii.xl,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tab: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    color: THEME.colors.text
  }
});
