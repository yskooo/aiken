import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import { api } from '../../lib/api';

export default function Handbook() {
  const [filename, setFilename] = React.useState('student-handbook.txt');
  const [text, setText] = React.useState('');
  const [docs, setDocs] = React.useState<any[]>([]);

  React.useEffect(() => { (async () => { try { const r = await api.get('/docs'); setDocs(r.data.docs||[]); } catch (e){} })(); }, []);

  const upload = async () => {
    await api.post('/docs', { filename, text, userId: 'user_1' });
    const r = await api.get('/docs'); setDocs(r.data.docs||[]);
    setText('');
  };

  const ask = async () => {
    const q = text;
    const r = await api.post('/docs/query', { q });
    if (r.data.hits && r.data.hits.length>0) {
      alert('Top hit: ' + r.data.hits[0].quote + ' (from ' + r.data.hits[0].doc + ')');
    } else {
      alert("I couldn't find this in your documents");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Student Handbook</Text></View>
      <View style={{padding:16}}>
        <Text>Filename</Text>
        <TextInput value={filename} onChangeText={setFilename} style={styles.input} />
        <Text style={{marginTop:8}}>Paste handbook text (for demo)</Text>
        <TextInput value={text} onChangeText={setText} style={[styles.input,{height:120}]} multiline />
        <Button title="Upload" onPress={upload} />
        <View style={{height:12}} />
        <Button title="Ask (demo query)" onPress={ask} />
      </View>

      <FlatList data={docs} keyExtractor={(d)=>d.id} renderItem={({item})=>(<View style={{padding:12}}><Text>{item.filename}</Text></View>)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container:{flex:1, backgroundColor:'#FFFBF3'}, header:{padding:16}, title:{fontSize:18,fontWeight:'700'}, input:{borderWidth:1,borderColor:'#E5E7EB',borderRadius:8,padding:8,marginTop:4} });
