import React from 'react';
import { SafeAreaView, View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { listPending, approvePending, rejectPending } from '../lib/pending';

export default function PendingApprovals() {
  const [items, setItems] = React.useState<any[]>([]);

  const load = async () => {
    const p = await listPending();
    setItems(p);
  };

  React.useEffect(() => { void load(); }, []);

  const onApprove = async (id: string) => {
    try {
      const r = await approvePending(id);
      Alert.alert('Approved', 'Pending action approved');
      void load();
    } catch (e:any) {
      Alert.alert('Error', e?.message || 'Failed');
    }
  };

  const onReject = async (id: string) => {
    try {
      await rejectPending(id);
      Alert.alert('Rejected', 'Pending action rejected');
      void load();
    } catch (e:any) {
      Alert.alert('Error', e?.message || 'Failed');
    }
  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#FFFBF3'}}>
      <View style={{padding:16}}>
        <Text style={{fontSize:18,fontWeight:'700'}}>Pending Approvals</Text>
      </View>
      <FlatList data={items} keyExtractor={(i)=>i.id} renderItem={({item})=> (
        <View style={styles.item}>
          <Text style={{fontWeight:'700'}}>{item.kind} — {item.status}</Text>
          <Text style={{color:'#6B7280',marginTop:6}}>{item.reasoning}</Text>
          <Text style={{marginTop:6}}>Expires: {new Date(item.expiresAt).toLocaleString()}</Text>
          <View style={{flexDirection:'row',marginTop:8}}>
            {item.status === 'pending' && <Button title="Approve" onPress={() => void onApprove(item.id)} />}
            <View style={{width:12}} />
            {item.status === 'pending' && <Button title="Reject" onPress={() => void onReject(item.id)} color="#B4232A" />}
          </View>
        </View>
      )} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ item:{padding:12,margin:12,backgroundColor:'#fff',borderRadius:12,shadowColor:'#000',shadowOpacity:0.03,shadowRadius:6} });
