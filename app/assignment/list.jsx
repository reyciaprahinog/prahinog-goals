import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { db } from '../../firebase';

export default function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'assignments'));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data(), status: doc.data().status || 'Open' });
      });
      setAssignments(items);
      setLoading(false);
    };
    fetchAssignments();
  }, []);

  // Filter tasks by search
  const filteredAssignments = assignments.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/assignment/edit?id=${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.icon}>🛠️</Text>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
      <Text style={styles.itemDeadline}>Deadline: {item.deadline}</Text>
      <Text style={styles.itemStatus}>Status: <Text style={{
        color: item.status === 'Completed' ? '#1a7431' : '#ffa726',
        fontWeight: 'bold'
      }}>{item.status}</Text></Text>
    </TouchableOpacity>
  );

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
      <Text style={styles.heading}>Task List</Text>
      {/* Search Bar */}
      <TextInput
        style={styles.search}
        placeholder="Search tasks or status..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#888"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#1a7431" style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={filteredAssignments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tasks found.</Text>
          }
        />
      )}
      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/assignment/add')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0b0b0b',
    alignItems: 'center',
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
    maxWidth: 500,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a7431',
    textAlign: 'center',
  },
  search: {
    width: '100%',
    maxWidth: 500,
    borderWidth: 1,
    borderColor: '#1a7431',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#222',
    color: '#fff',
    fontSize: 16,
  },
  list: {
    paddingBottom: 24,
    width: '100%',
    maxWidth: 500,
  },
  card: {
    backgroundColor: '#222',
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1a7431',
    shadowColor: '#1a7431',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 22,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemDeadline: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4,
  },
  itemStatus: {
    fontSize: 14,
    color: '#ffa726',
  },
  emptyText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  fab: {
    position: 'absolute',
    right: 28,
    bottom: 28,
    backgroundColor: '#1a7431',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#1a7431',
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: -2,
  },
});
