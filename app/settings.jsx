import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Example history of jobs/tasks
  const history = [
    {
      id: 1,
      title: 'Prepare a project proposal',
      date: '2025-09-22',
      status: 'Completed',
      location: 'Conference Room B',
    },
    {
      id: 2,
      title: 'Deliver a package',
      date: '2025-09-18',
      status: 'Completed',
      location: 'Client HQ',
    },
    {
      id: 3,
      title: 'Organize inventory',
      date: '2025-09-20',
      status: 'Completed',
      location: 'Warehouse',
    },
  ];

  const handleLogout = () => {
    Alert.alert('Logged out', 'You have been logged out.');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.row}>
          <Ionicons name="notifications-outline" size={22} color="#21cc8d" style={styles.icon} />
          <Text style={styles.label}>Enable Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#ccc", true: "#21cc8d" }}
            thumbColor={notifications ? "#21cc8d" : "#f4f3f4"}
          />
        </View>
        <View style={styles.row}>
          <Ionicons name="moon-outline" size={22} color="#007bff" style={styles.icon} />
          <Text style={styles.label}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#ccc", true: "#007bff" }}
            thumbColor={darkMode ? "#007bff" : "#f4f3f4"}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job/Task History</Text>
        <ScrollView style={{ maxHeight: 150 }}>
          {history.length === 0 ? (
            <Text style={{ color: '#888', fontStyle: 'italic' }}>No history yet.</Text>
          ) : (
            history.map(item => (
              <View key={item.id} style={styles.historyItem}>
                <Ionicons name="checkmark-done-circle" size={20} color="#21cc8d" style={{ marginRight: 8 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.historyTitle}>{item.title}</Text>
                  <Text style={styles.historyMeta}>
                    {item.date} • {item.location} • <Text style={styles.historyStatus}>{item.status}</Text>
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
      <Text style={styles.footer}>SERVICETask v1.0.0</Text>
      <Link style={styles.link} href="/settings">
        Go to Settings
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eaf6f6', padding: 24 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#007bff', marginBottom: 18, textAlign: 'center' },
  section: { backgroundColor: '#fff', borderRadius: 14, padding: 18, marginBottom: 24, elevation: 2 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#21cc8d', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  icon: { marginRight: 10 },
  label: { flex: 1, fontSize: 16, color: '#333' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#21cc8d', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 24, alignSelf: 'flex-start', marginTop: 8 },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  footer: { marginTop: 18, color: '#aaa', fontSize: 13, textAlign: 'center' },
  historyItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  historyTitle: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  historyMeta: { fontSize: 13, color: '#555' },
  historyStatus: { color: '#21cc8d', fontWeight: 'bold' },
  link: { marginTop: 20, color: '#007bff', fontSize: 16, textAlign: 'center' },
});