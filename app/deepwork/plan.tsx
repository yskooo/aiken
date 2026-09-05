import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import { planStudy } from '../../lib/agents/plannerAgent';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import DeepWorkModal from '../../components/DeepWorkModal';
import PomodoroModal from '../../components/PomodoroModal';
import { useSession } from '../../lib/auth';

export default function PlannerScreen() {
  const [goal, setGoal] = React.useState('Study for midterms');
  const [steps, setSteps] = React.useState<any[]>([]);
  const [proposedBlock, setProposedBlock] = React.useState<{start:string,end:string}|null>(null);
  const [showDeep, setShowDeep] = React.useState(false);
  const [showPomodoro, setShowPomodoro] = React.useState(false);
  const qc = useQueryClient();
  const { session } = useSession();

  const generate = async () => {
    const res = await api.get('/events');
    const events = res.data.events;
    const s = await planStudy(goal, events, session?.user?.id || 'user_1');
    setSteps(s);
    const block = s.find((x:any)=>x.proposedBlock)?.proposedBlock || null;
    setProposedBlock(block);
  };

  const proposeDeep = async () => {
    // For Phase 4 we create a session log but do NOT add to calendar (HITL in Phase 5)
    await api.post('/sessions', { userId: session?.user?.id || 'user_1', kind: 'deep_work', start: proposedBlock?.start, end: proposedBlock?.end });
    qc.invalidateQueries(['sessions']);
    alert('Deep Work proposed (logged). It will require approval in Phase 5.');
  };

  const onPomodoroStart = async (startedAt: string) => {
    await api.post('/sessions', { userId: session?.user?.id || 'user_1', kind: 'pomodoro', startedAt });
    qc.invalidateQueries(['sessions']);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Planner</Text></View>
      <View style={{padding:16}}>
        <TextInput value={goal} onChangeText={setGoal} style={styles.input} />
        <Button title="Generate Study Plan" onPress={() => void generate()} color="#F2A93B" />
      </View>

      <FlatList data={steps} keyExtractor={(s:any)=>s.id} renderItem={({item})=> (
        <View style={{padding:12}}>
          <Text style={{fontWeight:'700'}}>{item.label}</Text>
          <Text>{item.estimatedMinutes} minutes</Text>
          {item.proposedBlock && <Text style={{color:'#6B7280',marginTop:6}}>Proposed: {new Date(item.proposedBlock.start).toLocaleString()}</Text>}
        </View>
      )} />

      <View style={{padding:16}}>
        <Button title="Enter Deep Work Mode" onPress={() => setShowDeep(true)} color="#B4232A" />
        <View style={{height:12}} />
        <Button title="Open Pomodoro" onPress={() => setShowPomodoro(true)} />
      </View>

      <DeepWorkModal visible={showDeep} onClose={() => setShowDeep(false)} block={proposedBlock} onPropose={() => void proposeDeep()} />
      <PomodoroModal visible={showPomodoro} onClose={() => setShowPomodoro(false)} onStart={(s)=>void onPomodoroStart(s)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container:{flex:1,backgroundColor:'#FFFBF3'}, header:{padding:16}, title:{fontSize:18,fontWeight:'700'}, input:{borderWidth:1,borderColor:'#E5E7EB',borderRadius:8,padding:8} });
