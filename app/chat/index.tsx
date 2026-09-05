import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { ChatMessage } from '../../types/models';
import ChatBubble from '../../components/ChatBubble';
import { handleUserMessage } from '../../lib/agents/routerAgent';
import { useSession } from '../../lib/auth';

export default function ChatScreen() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [text, setText] = React.useState('');
  const { session } = useSession();

  React.useEffect(() => {
    // load seed fixture locally if available
    (async () => {
      try {
        const mod = await import('../../fixtures/chat.json');
        setMessages(mod.default || mod);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const send = async () => {
    if (!text.trim() || !session?.user) return;
    const userMsg: ChatMessage = { id: 'msg_' + Date.now(), userId: session.user.id, role: 'user', content: text.trim(), createdAt: new Date().toISOString() };
    setMessages((m) => [...m, userMsg]);
    setText('');

    const reply = await handleUserMessage(userMsg.content, session.user.id);
    setMessages((m) => [...m, reply]);
  };

  const quickPills = [
    "Have a concern regarding school?",
    'Late Assignment Submission',
    "What's due this week",
    'Missed a Class'
  ];

  const onPill = async (label: string) => {
    if (!session?.user) return;
    const userMsg: ChatMessage = { id: 'msg_' + Date.now(), userId: session.user.id, role: 'user', content: label, createdAt: new Date().toISOString() };
    setMessages((m) => [...m, userMsg]);
    const reply = await handleUserMessage(label, session.user.id);
    setMessages((m) => [...m, reply]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alken assist you</Text>
      </View>

      <View style={styles.pillsRow}>
        {quickPills.map((p) => (
          <TouchableOpacity key={p} style={styles.pill} onPress={() => void onPill(p.toLowerCase())}>
            <Text style={styles.pillText}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble message={item} />}
      />

      <View style={styles.composer}>
        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Ask Aiken..." />
        <Button title="Send" onPress={() => void send()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF3' },
  header: { padding: 16 },
  title: { fontSize: 18, fontWeight: '700', color: '#B4232A' },
  pillsRow: { flexDirection: 'row', paddingHorizontal: 12, paddingBottom: 8, flexWrap: 'wrap' },
  pill: { backgroundColor: '#FFF4E6', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  pillText: { color: '#7C2D12' },
  composer: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  input: { flex: 1, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 8, marginRight: 8 }
});
