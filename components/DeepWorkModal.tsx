import React from 'react';
import { View, Text, Modal, StyleSheet, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { THEME } from '../lib/theme';

type Props = { visible: boolean; onClose: () => void; block: { start: string; end: string } | null; onPropose: () => void };

export default function DeepWorkModal({ visible, onClose, block, onPropose }: Props) {
  const askMutePermission = async () => {
    // stubbed: ask permission (expo-notifications) but do not auto-grant
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission', 'Muted notifications not granted (stub).');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.header}>Enter Deep Work Mode</Text>
        <Text style={{marginTop:8}}>Proposed block:</Text>
        <Text style={{marginTop:6,fontWeight:'600'}}>{block ? `${new Date(block.start).toLocaleString()} — ${new Date(block.end).toLocaleString()}` : 'No block proposed'}</Text>
        <View style={{marginTop:16}}>
          <Button title="Ask to mute notifications" onPress={() => void askMutePermission()} color={THEME.colors.primary} />
          <View style={{height:12}} />
          <Button title="Propose Deep Work" onPress={() => { onPropose(); onClose(); }} color={THEME.colors.secondary} />
          <View style={{height:12}} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({ container:{flex:1,padding:16,backgroundColor:THEME.colors.background}, header:{fontSize:20,fontWeight:'700'} });
