import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { deleteUser, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db, storage } from '../firebase';

export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const refUser = doc(db, 'users', auth.currentUser.uid);
        const snap = await getDoc(refUser);
        if (snap.exists()) {
          const data = snap.data();
          setName(data.name);
          setEmail(data.email);
          setAvatar(data.avatar || '');
          setPhone(data.phone || '');
          setBio(data.bio || '');
          setCreatedAt(data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : '');
        }
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    if (!name) {
      setMsg('Name cannot be empty.');
      return;
    }
    const refUser = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(refUser, { name, avatar, phone, bio });
    setMsg('Profile updated!');
  };

  const pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUploading(true);
      const img = result.assets[0];
      const response = await fetch(img.uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      setAvatar(url);
      setMsg('Avatar uploaded. Save to update.');
      setUploading(false);
    }
  };

  const handlePasswordReset = async () => {
    await sendPasswordResetEmail(auth, email);
    setMsg('Password reset email sent!');
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteDoc(doc(db, 'users', auth.currentUser.uid));
            await deleteUser(auth.currentUser);
            router.replace('/signup');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>SERVICETask</Text>
      <Text style={styles.heading}>Profile Info</Text>
      <TouchableOpacity onPress={pickAvatar}>
        {uploading ? (
          <ActivityIndicator size="small" color="#1a7431" style={{ marginBottom: 12 }} />
        ) : avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={{ color: '#888', fontSize: 32 }}>👤</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        placeholder="Bio / Description"
        placeholderTextColor="#888"
        multiline
      />
      <TextInput
        style={[styles.input, { backgroundColor: '#222' }]}
        value={email}
        editable={false}
        placeholder="Email"
        placeholderTextColor="#888"
      />
      {createdAt ? (
        <Text style={styles.createdAt}>Joined: {createdAt}</Text>
      ) : null}
      {msg ? <Text style={styles.msg}>{msg}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a7431',
    marginBottom: 8,
    textAlign: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a7431',
    marginBottom: 18,
    textAlign: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#1a7431',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#1a7431',
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
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1a7431',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#444',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  msg: {
    color: '#29b6f6',
    marginBottom: 8,
    textAlign: 'center',
  },
  createdAt: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },
});