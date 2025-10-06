import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Example jobs/tasks with full details
const tasks = [
  {
    id: 1,
    title: 'Clean the office',
    type: 'On-site',
    salary: '₱500',
    location: 'Main Office',
    description: 'Vacuum, dust, and sanitize all workspaces and meeting rooms.',
    status: 'In Progress',
    due: '2025-09-28',
    assignedTo: 'Alex',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Design a company logo',
    type: 'Remote',
    salary: '₱2,000',
    location: 'Remote',
    description: 'Create 3 logo concepts for review by the marketing team.',
    status: 'Pending',
    due: '2025-09-30',
    assignedTo: 'Jamie',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Prepare a project proposal',
    type: 'On-site',
    salary: '₱1,200',
    location: 'Conference Room B',
    description: 'Draft and print the proposal for the new client project.',
    status: 'Completed',
    due: '2025-09-22',
    assignedTo: 'Morgan',
    priority: 'High',
  },
  {
    id: 4,
    title: 'Schedule a client meeting',
    type: 'On-site',
    salary: '₱800',
    location: 'Client HQ',
    description: 'Coordinate with client to set a meeting date and time.',
    status: 'Pending',
    due: '2025-10-01',
    assignedTo: 'Taylor',
    priority: 'Low',
  },
  {
    id: 5,
    title: 'Update the website',
    type: 'Remote',
    salary: '₱1,500',
    location: 'Remote',
    description: 'Add new service pages and update contact information.',
    status: 'In Progress',
    due: '2025-10-03',
    assignedTo: 'Jordan',
    priority: 'Medium',
  },
];

export default function Dashboard() {
  const availableTasks = tasks.filter(t => t.status !== 'Completed');

  const handleApply = (task) => {
    Alert.alert('Application Sent', `You have applied for "${task.title}"!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find Jobs & Tasks</Text>
      <View style={styles.dashCard}>
        <Ionicons name="briefcase-outline" size={36} color="#21cc8d" style={{ marginRight: 12 }} />
        <View>
          <Text style={styles.dashTitle}>Available Opportunities</Text>
          <Text style={styles.dashCount}>{availableTasks.length} job(s) available</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>Browse Jobs & Tasks</Text>
      <ScrollView style={styles.taskList}>
        {tasks.map(task => (
          <View key={task.id} style={styles.taskCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <Ionicons name="briefcase" size={20} color="#007bff" style={{ marginRight: 8 }} />
              <Text style={styles.taskTitle}>{task.title}</Text>
            </View>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Type:</Text> {task.type}</Text>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Location:</Text> {task.location}</Text>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Salary:</Text> {task.salary}</Text>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Due:</Text> {task.due}</Text>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Priority:</Text> {task.priority}</Text>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Status:</Text> 
              <Text style={[
                styles.status,
                task.status === 'Completed' ? styles.statusCompleted :
                task.status === 'In Progress' ? styles.statusInProgress :
                styles.statusPending
              ]}> {task.status}</Text>
            </Text>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Assigned To:</Text> {task.assignedTo}</Text>
            <Text style={styles.detail}><Text style={styles.detailLabel}>Description:</Text> {task.description}</Text>
            <TouchableOpacity style={styles.applyBtn} onPress={() => handleApply(task)}>
              <Ionicons name="send" size={16} color="#fff" />
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eaf6f6', paddingTop: 48, paddingHorizontal: 20 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#007bff', marginBottom: 8, textAlign: 'center' },
  dashCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#21cc8d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  dashTitle: { fontSize: 18, fontWeight: 'bold', color: '#21cc8d' },
  dashCount: { fontSize: 16, color: '#007bff', marginTop: 2 },
  subtitle: { fontSize: 18, color: '#21cc8d', marginBottom: 12, textAlign: 'center', fontWeight: '600' },
  taskList: { flex: 1, marginBottom: 16 },
  taskCard: { backgroundColor: '#fff', borderRadius: 14, padding: 18, marginBottom: 14, shadowColor: '#21cc8d', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  taskTitle: { fontSize: 17, fontWeight: 'bold', color: '#333' },
  status: { fontWeight: 'bold' },
  statusCompleted: { color: '#21cc8d' },
  statusInProgress: { color: '#007bff' },
  statusPending: { color: '#ff9800' },
  detail: { fontSize: 14, color: '#444', marginBottom: 2 },
  detailLabel: { fontWeight: 'bold', color: '#21cc8d' },
  applyBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#21cc8d', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 18, marginTop: 10, alignSelf: 'flex-end' },
  applyBtnText: { color: '#fff', fontWeight: 'bold', marginLeft: 6, fontSize: 15 },
});