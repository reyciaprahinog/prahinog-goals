import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const upcoming = [
  { id: 1, title: 'Clean the office', due: '2025-09-28' },
  { id: 2, title: 'Design a company logo', due: '2025-09-30' },
  { id: 3, title: 'Schedule a client meeting', due: '2025-10-01' },
];

export default function Calendar() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar View</Text>
      <Text style={styles.info}>(Integrate a calendar library for full functionality.)</Text>
      <Text style={styles.upcomingTitle}>Upcoming Tasks</Text>
      <ScrollView style={styles.upcomingList}>
        {upcoming.map(task => (
          <View key={task.id} style={styles.upcomingCard}>
            <Ionicons name="calendar-outline" size={20} color="#21cc8d" style={{ marginRight: 8 }} />
            <Text style={styles.upcomingTask}>{task.title}</Text>
            <Text style={styles.upcomingDue}>{task.due}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eaf6f6', justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#007bff', marginBottom: 8 },
  info: { color: '#888', fontSize: 16, textAlign: 'center', marginBottom: 16 },
  upcomingTitle: { fontSize: 18, color: '#21cc8d', fontWeight: 'bold', marginBottom: 8 },
  upcomingList: { width: '100%' },
  upcomingCard: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  upcomingTask: { fontSize: 16, color: '#333', fontWeight: 'bold', flex: 1 },
  upcomingDue: { fontSize: 14, color: '#007bff', marginLeft: 8 },
});