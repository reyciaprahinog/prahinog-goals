<<<<<<< HEAD
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/login'); // redirect to login first
    }, 1000); // small delay for splash/loading effect

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
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
      <ActivityIndicator size="large" color="#1a7431" style={{ marginTop: 32 }} />
      <Text style={styles.text}>Loading SERVICETask...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // black background
    padding: 24,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a7431',
    marginBottom: 12,
    textAlign: 'center',
  },
  appDesc: {
    fontSize: 15,
    color: '#ccc',
    marginBottom: 24,
    textAlign: 'center',
    maxWidth: 500,
  },
  text: {
    marginTop: 12,
    fontSize: 18,
    color: '#1a7431',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
=======
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  const [user, setUser] = useState({
    name: 'Juan Dela Cruz',
    email: 'juan@email.com',
    phone: '09171234567',
    location: 'Manila, Philippines',
    bio: 'Aspiring freelancer. Ready to work!',
  });
  const [editModal, setEditModal] = useState(false);
  const [editUser, setEditUser] = useState(user);
  const router = useRouter();

  const handleSave = () => {
    setUser(editUser);
    setEditModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://ui-avatars.com/api/?name=User&background=21cc8d&color=fff&size=128' }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.info}><Ionicons name="mail" size={16} color="#21cc8d" /> {user.email}</Text>
          <Text style={styles.info}><Ionicons name="call" size={16} color="#21cc8d" /> {user.phone}</Text>
          <Text style={styles.info}><Ionicons name="location" size={16} color="#21cc8d" /> {user.location}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={() => { setEditUser(user); setEditModal(true); }}>
          <Ionicons name="create-outline" size={20} color="#007bff" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Get Started</Text>
        <Link style={styles.link} href="/dashboard">
          Dashboard
        </Link>
        <Link style={styles.linkOutline} href="/taskform">
          Create Task
        </Link>
        <Link style={styles.linkOutline} href="/calendar">
          Calendar View
        </Link>
        <TouchableOpacity style={styles.settingsBtn} onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={20} color="#21cc8d" />
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>© {new Date().getFullYear()} SERVICETask</Text>

      {/* Edit Profile Modal */}
      <Modal visible={editModal} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editUser.name}
              onChangeText={v => setEditUser({ ...editUser, name: v })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editUser.email}
              onChangeText={v => setEditUser({ ...editUser, email: v })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={editUser.phone}
              onChangeText={v => setEditUser({ ...editUser, phone: v })}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={editUser.location}
              onChangeText={v => setEditUser({ ...editUser, location: v })}
            />
            <TextInput
              style={[styles.input, { height: 60 }]}
              placeholder="Bio"
              value={editUser.bio}
              onChangeText={v => setEditUser({ ...editUser, bio: v })}
              multiline
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditModal(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eaf6f6', alignItems: 'center', justifyContent: 'center', padding: 20 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
    width: 340,
    shadowColor: '#21cc8d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 18,
    backgroundColor: '#b2ebf2',
  },
  name: { fontSize: 22, fontWeight: 'bold', color: '#007bff', marginBottom: 2 },
  info: { fontSize: 15, color: '#333', marginBottom: 2 },
  bio: { fontSize: 14, color: '#21cc8d', marginTop: 4, fontStyle: 'italic' },
  editBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#eaf6f6',
    borderRadius: 16,
    padding: 6,
    elevation: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    width: 340,
    marginBottom: 24,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#21cc8d', marginBottom: 18 },
  link: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#21cc8d',
    color: 'white',
    borderRadius: 8,
    width: 200,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    elevation: 2,
    shadowColor: '#21cc8d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  linkOutline: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#fff',
    color: '#21cc8d',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#21cc8d',
    width: 200,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    elevation: 2,
    shadowColor: '#21cc8d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    backgroundColor: '#eaf6f6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#21cc8d',
  },
  settingsText: { color: '#21cc8d', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  footer: { marginTop: 18, color: '#aaa', fontSize: 13, textAlign: 'center' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.15)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: 320, elevation: 8 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#007bff', marginBottom: 14, textAlign: 'center' },
  input: { backgroundColor: '#eaf6f6', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 15, borderWidth: 1, borderColor: '#b2ebf2' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  saveBtn: { backgroundColor: '#21cc8d', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 24 },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelBtn: { backgroundColor: '#fff', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 24, borderWidth: 1, borderColor: '#21cc8d' },
  cancelBtnText: { color: '#21cc8d', fontWeight: 'bold', fontSize: 16 },
});

export default Home;
>>>>>>> 39e2899829d23884b84fa5f82975be06b6039c12
