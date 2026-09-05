import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { api } from '../../lib/api';
import { computeFocusMinutes, countPomodoros } from '../../lib/analytics';
import SmallBarChart from '../../components/SmallBarChart';

export default function Reports() {
  const [sessions, setSessions] = React.useState<any[]>([]);
  const [period, setPeriod] = React.useState<'week'|'month'>('week');

  React.useEffect(() => { void load(); }, [period]);

  const load = async () => {
    try {
      const r = await api.get('/sessions');
      setSessions(r.data.sessions || []);
    } catch (e) {
      setSessions([]);
    }
  };

  const focus = computeFocusMinutes(sessions);
  const pomos = countPomodoros(sessions);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Reports</Text></View>
      <View style={{padding:16}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Button title="Week" onPress={() => setPeriod('week')} />
          <Button title="Month" onPress={() => setPeriod('month')} />
        </View>
        <View style={{height:12}} />
        <Text style={{fontWeight:'700'}}>Focus time (minutes): {focus}</Text>
        <Text style={{marginTop:8}}>Completed Pomodoros: {pomos}</Text>

        <View style={{marginTop:16}}>
          <Text style={{fontWeight:'700'}}>Focus this period</Text>
          <SmallBarChart data={[Math.floor(focus/3), Math.floor(focus/2), focus]} />
        </View>

      </View>

      <FlatList data={sessions} keyExtractor={(s)=>s.id} renderItem={({item})=> (
        <View style={{padding:12}}>
          <Text style={{fontWeight:'700'}}>{item.kind}</Text>
          {item.start && <Text>Start: {new Date(item.start).toLocaleString()}</Text>}
          {item.end && <Text>End: {new Date(item.end).toLocaleString()}</Text>}
        </View>
      )} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container:{flex:1,backgroundColor:'#FFFBF3'}, header:{padding:16}, title:{fontSize:18,fontWeight:'700'} });
