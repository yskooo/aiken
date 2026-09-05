import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from '../types/models';
import { THEME } from '../lib/theme';

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <View style={[styles.container, isUser ? styles.user : styles.assistant]}>
      <Text style={[styles.text, isUser ? styles.userText : styles.assistantText]}>{message.content}</Text>
      {message.sourceSnippets && message.sourceSnippets.length > 0 && (
        <View style={styles.snippets}>
          {message.sourceSnippets.map((s, i) => (
            <Text key={i} style={styles.snippetText}>
              Source: {s.doc} — "{s.quote}"
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 12,
    borderRadius: 12,
    maxWidth: '85%'
  },
  assistant: {
    backgroundColor: '#FFF7ED'
  },
  user: {
    backgroundColor: '#E5E7EB',
    alignSelf: 'flex-end'
  },
  text: { fontSize: 15 },
  assistantText: { color: '#7C2D12' },
  userText: { color: '#111827' },
  snippets: { marginTop: 8, borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 8 },
  snippetText: { fontSize: 12, color: '#6B7280' }
});
