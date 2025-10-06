import { useRouter } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../../firebase';

export default function AddAssignment() {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleAdd = async () => {
    if (!title || !deadline || !price || !location) {
      alert('Please enter title, deadline, price, and location.');
      return;
    }
    await addDoc(collection(db, 'assignments'), {
      title,
      deadline,
      price: Number(price),
      location,
    });
    router.push('/assignment/list');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={handleBack}>
        <Text style={styles.backIconText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.appTitle}>SERVICETask</Text>
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
      <TextInput
        placeholder="Price (e.g. 25)"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Location (e.g. New York, NY)"
        value={location}
        onChangeText={setLocation}
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
  backIcon: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  backIconText: {
    fontSize: 28,
    color: '#1a7431',
    fontWeight: 'bold',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a7431',
    marginBottom: 8,
    textAlign: 'center',
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
