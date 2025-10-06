import { useLocalSearchParams, useRouter } from 'expo-router';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../../firebase';

export default function EditAssignment() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadAssignment = async () => {
    setLoading(true);
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    const ref = doc(db, 'assignments', id);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      setTitle(data.title);
      setDeadline(data.deadline);
      setPrice(data.price ? String(data.price) : '');
      setLocation(data.location ? data.location : '');
      setNotFound(false);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAssignment();
    // eslint-disable-next-line
  }, [id]);

  const handleUpdate = async () => {
    const ref = doc(db, 'assignments', id);
    await updateDoc(ref, {
      title,
      deadline,
      price: Number(price),
      location,
    });
    router.push('/assignment/list');
  };

  const handleDelete = async () => {
    const ref = doc(db, 'assignments', id);
    await deleteDoc(ref);
    router.push('/assignment/list');
  };

  const handleBack = () => {
    router.back();
  };

  if (notFound) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backIcon} onPress={handleBack}>
          <Text style={styles.backIconText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.appTitle}>SERVICETask</Text>
        {/* Illustration */}
        <Text style={styles.illustration}>📄❌</Text>
        <Text style={styles.errorTitle}>Assignment Not Found</Text>
        <Text style={styles.errorDesc}>
          The requested task does not exist or the ID is invalid.
        </Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleBack}
          >
            <Text style={styles.actionButtonText}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#1a7431' }]}
            onPress={() => router.push('/assignment/add')}
          >
            <Text style={styles.actionButtonText}>Add New Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#29b6f6' }]}
            onPress={() => router.push('/assignment/list')}
          >
            <Text style={styles.actionButtonText}>View All Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#ffa726' }]}
            onPress={loadAssignment}
            disabled={loading}
          >
            <Text style={styles.actionButtonText}>
              {loading ? 'Refreshing...' : 'Retry'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#d32f2f' }]}
            onPress={() => {
              // Example: open email app
              window.open('mailto:support@servicetask.com?subject=Assignment%20Not%20Found');
            }}
          >
            <Text style={styles.actionButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
        {/* Recent Tasks */}
        <Text style={styles.recentTitle}>Recent Tasks</Text>
        <View style={styles.recentList}>
          {[
            { title: 'Clean backyard', location: 'Los Angeles, CA' },
            { title: 'Fix leaking faucet', location: 'Houston, TX' },
            { title: 'Dog walking', location: 'Seattle, WA' },
          ].map((task, idx) => (
            <View key={idx} style={styles.recentItem}>
              <Text style={styles.recentTask}>{task.title}</Text>
              <Text style={styles.recentLocation}>{task.location}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={handleBack}>
        <Text style={styles.backIconText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.appTitle}>SERVICETask</Text>
      <Text style={styles.heading}>Edit Task</Text>
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
        <Button title="Update" onPress={handleUpdate} color="#1a7431" />
      </View>
      <View style={{ height: 12 }} />
      <View style={styles.buttonWrapper}>
        <Button title="Delete" color="red" onPress={handleDelete} />
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
  illustration: {
    fontSize: 48,
    marginBottom: 12,
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff5252',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorDesc: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 24,
    textAlign: 'center',
    maxWidth: 400,
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 400,
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#444',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a7431',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  recentList: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  recentItem: {
    backgroundColor: '#23272f',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    width: '100%',
  },
  recentTask: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  recentLocation: {
    color: '#29b6f6',
    fontSize: 13,
  },
});
