import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { db } from '../../firebase';

const exampleTasks = [
  {
    id: 'ex1',
    title: 'Clean backyard',
    deadline: '2025-10-10',
    status: 'Open',
    icon: '🧹',
    price: 25,
    location: 'Los Angeles, CA',
  },
  {
    id: 'ex2',
    title: 'Fix leaking faucet',
    deadline: '2025-10-12',
    status: 'In Progress',
    icon: '🔧',
    price: 40,
    location: 'Houston, TX',
  },
  {
    id: 'ex3',
    title: 'Deliver groceries',
    deadline: '2025-10-08',
    status: 'Completed',
    icon: '🛒',
    price: 15,
    location: 'Miami, FL',
  },
  {
    id: 'ex4',
    title: 'Paint living room',
    deadline: '2025-10-15',
    status: 'Open',
    icon: '🎨',
    price: 100,
    location: 'Chicago, IL',
  },
  {
    id: 'ex5',
    title: 'Dog walking',
    deadline: '2025-10-09',
    status: 'Open',
    icon: '🐕',
    price: 20,
    location: 'Seattle, WA',
  },
  {
    id: 'ex6',
    title: 'Move furniture',
    deadline: '2025-10-13',
    status: 'Open',
    icon: '🚚',
    price: 60,
    location: 'New York, NY',
  },
  {
    id: 'ex7',
    title: 'Garden maintenance',
    deadline: '2025-10-11',
    status: 'In Progress',
    icon: '🌱',
    price: 35,
    location: 'San Francisco, CA',
  },
  {
    id: 'ex8',
    title: 'Tutoring math',
    deadline: '2025-10-14',
    status: 'Open',
    icon: '📚',
    price: 30,
    location: 'Boston, MA',
  },
];

function StatusBadge({ status }) {
  let color = '#ffa726';
  if (status === 'Completed') color = '#1a7431';
  if (status === 'Open') color = '#29b6f6';
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.badgeText}>{status}</Text>
    </View>
  );
}

export default function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();
  const flatListRef = useRef();

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'assignments'));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            ...doc.data(),
            status: doc.data().status || 'Open',
            icon: doc.data().icon || '🛠️',
            price: doc.data().price || 0,
            location: doc.data().location || 'Unknown',
          });
        });
        setAssignments(items.length ? items : exampleTasks);
      } catch (e) {
        setAssignments(exampleTasks);
      }
      setLoading(false);
    };
    fetchAssignments();
  }, []);

  const filteredAssignments = assignments.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  // Scroll left/right by a fixed amount
  const scrollBy = (offset) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: Math.max(0, offset),
        animated: true,
      });
    }
  };

  // Track current scroll position
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = (event) => {
    setScrollPos(event.nativeEvent.contentOffset.x);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View
        style={[
          styles.container,
          { backgroundColor: darkMode ? '#181818' : '#f5f5f5' }
        ]}
      >
        {/* App Title and Description */}
        <Text
          style={[
            styles.appTitle,
            { color: darkMode ? '#1a7431' : '#1976d2' }
          ]}
        >
          SERVICETask
        </Text>
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
        <Text style={styles.heading}>Available Tasks</Text>
        <TextInput
          style={styles.search}
          placeholder="Search tasks, status, or location..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#888"
        />
        {/* Scroll Buttons and Horizontal Task List */}
        <View style={styles.horizontalScrollWrapper}>
          <TouchableOpacity
            style={styles.scrollButton}
            onPress={() => scrollBy(scrollPos - 250)}
          >
            <Text style={styles.scrollButtonText}>←</Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator size="large" color="#1a7431" style={{ marginTop: 32 }} />
          ) : (
            <FlatList
              ref={flatListRef}
              data={filteredAssignments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cardHorizontal}
                  onPress={() => router.push(`/assignment/edit?id=${item.id}`)}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.icon}>{item.icon}</Text>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                  </View>
                  <StatusBadge status={item.status} />
                  <Text style={styles.itemDeadline}>Deadline: {item.deadline}</Text>
                  <Text style={styles.itemPrice}>Price: ${item.price}</Text>
                  <Text style={styles.itemLocation}>Location: {item.location}</Text>
                </TouchableOpacity>
              )}
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.horizontalList}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            />
          )}
          <TouchableOpacity
            style={styles.scrollButton}
            onPress={() => scrollBy(scrollPos + 250)}
          >
            <Text style={styles.scrollButtonText}>→</Text>
          </TouchableOpacity>
        </View>
        {/* Add Task Floating Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/assignment/add')}
        >
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>
        {/* Top Bar with Settings Icon */}
        <View style={styles.topBar}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowSettings(true)}>
            <Text style={styles.iconButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
        {showSettings && (
          <View style={styles.settingsModal}>
            <Text style={styles.settingsTitle}>Settings</Text>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => setDarkMode(!darkMode)}
            >
              <Text style={styles.settingsItemText}>
                {darkMode ? '🌙 Switch to Light Mode' : '☀️ Switch to Dark Mode'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => {
                setShowSettings(false);
                router.push('/profile');
              }}
            >
              <Text style={styles.settingsItemText}>👤 Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsClose}
              onPress={() => setShowSettings(false)}
            >
              <Text style={styles.settingsCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#181818',
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
  horizontalScrollWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    maxWidth: 500,
    justifyContent: 'center',
  },
  scrollButton: {
    backgroundColor: '#1a7431',
    borderRadius: 24,
    padding: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  scrollButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  horizontalList: {
    paddingVertical: 8,
  },
  cardHorizontal: {
    backgroundColor: '#23272f',
    padding: 18,
    borderRadius: 16,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#1a7431',
    shadowColor: '#1a7431',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 220,
    maxWidth: 220,
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  itemDeadline: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    color: '#1a7431',
    fontWeight: 'bold',
    marginTop: 4,
  },
  itemLocation: {
    fontSize: 14,
    color: '#29b6f6',
    marginTop: 2,
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginBottom: 6,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    marginBottom: 8,
    marginTop: 8,
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  iconButtonText: {
    fontSize: 28,
    color: '#1a7431',
    fontWeight: 'bold',
  },
  settingsModal: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#23272f',
    borderRadius: 12,
    padding: 18,
    zIndex: 100,
    width: 220,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a7431',
    marginBottom: 12,
  },
  settingsItem: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  settingsItemText: {
    color: '#fff',
    fontSize: 16,
  },
  settingsClose: {
    marginTop: 14,
    backgroundColor: '#1a7431',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  settingsCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
