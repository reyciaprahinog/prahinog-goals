import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebase';

export default function Home() {
  const router = useRouter();
  const [profile, setProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const ref = doc(db, 'users', auth.currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data());
        }
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.appTitle}>SERVICETask</Text>
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>👤 {profile.name}</Text>
          <Text style={styles.profileEmail}>{profile.email}</Text>
        </View>
        <Text style={styles.title}>Welcome to SERVICETask</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/assignment/add')}
          >
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/assignment/list')}
          >
            <Text style={styles.buttonText}>View Tasks</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00c853',
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#00c853',
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    gap: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00c853',
    shadowColor: '#00c853',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#00c853',
    fontWeight: '600',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#d32f2f',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#d32f2f',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 16,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  profileCard: {
    backgroundColor: '#23272f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1a7431',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a7431',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#ccc',
  },
});
