import { useRouter } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../../firebase';

export default function AddAssignment() {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const router = useRouter();

  const handleAdd = async () => {
    if (!title || !deadline) {
      alert('Please enter both title and deadline.');
      return;
    }
    await addDoc(collection(db, 'assignments'), {
      title,
      deadline,
    });
    router.push('/assignment/list');
  };

  return (
    <View style={styles.container}>
      {/* App Title and Description */}
      <Text style={styles.appTitle}>SERVICETask</Text>
      <Text style={styles.appDesc}>
        SERVICETask is a user-friendly mobile app designed to connect people who need jobs done with those who are looking for work. Whether you're a homeowner needing help with a task or a skilled worker looking for your next gig, SERVICETask makes it easy to post, find, and manage jobs in your area.
        {"\n\n"}
        Key Features:
        {"\n"}• Post a task and hire local help
        {"\n"}• Browse available jobs based on your skills
        {"\n"}• In-app chat and job tracking
        {"\n"}• Secure payments and reviews
        {"\n\n"}
        SERVICETask empowers communities by simplifying the way people work together — whether it’s cleaning, repairs, deliveries, or freelance work.
      </Text>
      <Text style={styles.heading}>Add New Task</Text>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TextInput
        placeholder="Deadline (e.g. 2025-10-05)"
        value={deadline}
        onChangeText={setDeadline}
        style={styles.input}
        placeholderTextColor="#666"
      />
      <View style={styles.buttonWrapper}>
        <Button title="Add Task" onPress={handleAdd} color="#1a7431" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b0b0b',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a7431',
    marginBottom: 8,
    textAlign: 'center',
  },
  appDesc: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 24,
    textAlign: 'center',
    maxWidth: 400,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a7431',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#1a7431',
    padding: 12,
    marginBottom: 14,
    borderRadius: 8,
    backgroundColor: '#111',
    color: '#fff',
  },
  buttonWrapper: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
  },
});
