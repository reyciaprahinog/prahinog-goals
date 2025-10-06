import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Switch, Platform } from 'react-native';
import { useRouter } from 'expo-router';

const priorities = ['Low', 'Medium', 'High'];

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [reminder, setReminder] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSave = () => {
    if (!title.trim() || !due.trim()) {
      Alert.alert('Missing Fields', 'Please fill in the required fields.');
      return;
    }
    Alert.alert(
      'Task Created!',
      `Title: ${title}\nDue: ${due}\nPriority: ${priority}\nAssigned To: ${assignedTo}\nLocation: ${location}\nReminder: ${reminder ? 'Yes' : 'No'}\nDescription: ${description}`
    );
    router.replace('/dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title *"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date (YYYY-MM-DD) *"
        value={due}
        onChangeText={setDue}
      />
      <View style={styles.row}>
        <Text style={styles.label}>Priority:</Text>
        <View style={styles.priorityGroup}>
          {priorities.map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.priorityBtn,
                priority === p && styles.priorityBtnActive,
              ]}
              onPress={() => setPriority(p)}
            >
              <Text
                style={[
                  styles.priorityText,
                  priority === p && styles.priorityTextActive,
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Assign To (Name)"
        value={assignedTo}
        onChangeText={setAssignedTo}
      />
      <TextInput
        style={styles.input}
        placeholder="Location / Place"
        value={location}
        onChangeText={setLocation}
      />
      <View style={styles.row}>
        <Text style={styles.label}>Set Reminder:</Text>
        <Switch
          value={reminder}
          onValueChange={setReminder}
          trackColor={{ false: "#ccc", true: "#21cc8d" }}
          thumbColor={reminder ? "#21cc8d" : "#f4f3f4"}
        />
      </View>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
      <View style={styles.bottomLinks}>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Text style={styles.link}>Profile Info</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Text style={styles.link}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eaf6f6', padding: 24, justifyContent: 'center' },
  header: { fontSize: 26, fontWeight: 'bold', color: '#007bff', marginBottom: 24, textAlign: 'center' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 18, fontSize: 16, borderWidth: 1, borderColor: '#b2ebf2' },
  saveButton: { backgroundColor: '#21cc8d', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  label: { fontSize: 16, color: '#333', marginRight: 10, width: 100 },
  priorityGroup: { flexDirection: 'row', gap: 8 },
  priorityBtn: {
    borderWidth: 1,
    borderColor: '#21cc8d',
    borderRadius: 6,
    paddingVertical: Platform.OS === 'ios' ? 6 : 2,
    paddingHorizontal: 14,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  priorityBtnActive: {
    backgroundColor: '#21cc8d',
  },
  priorityText: {
    color: '#21cc8d',
    fontWeight: 'bold',
    fontSize: 15,
  },
  priorityTextActive: {
    color: '#fff',
  },
  bottomLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 24,
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 12,
  },
});