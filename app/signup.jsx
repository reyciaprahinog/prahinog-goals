import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../firebase';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      // Save profile info to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
      });
      setPassword('');
      setEmail('');
      setName('');
      setErrorMsg('✅ Account created! Redirecting to login...');
      setTimeout(() => {
        router.replace('/login');
      }, 1500);
    } catch (error) {
      setErrorMsg('⚠️ ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        {/* App Title and Description */}
        <Text style={styles.appTitle}>SERVICETask</Text>
        <Text style={styles.appDesc}>
          SERVICETask is a user-friendly mobile app designed to connect people who need jobs done with those who are looking for work. Whether you're a homeowner needing help with a task or a skilled worker looking for your next gig, SERVICETask makes it easy to post, find, and manage jobs in your area.
          {"\n\n"}
          <Text style={styles.featuresTitle}>Key Features:</Text>
          {"\n"}• Post a task and hire local help
          {"\n"}• Browse available jobs based on your skills
          {"\n"}• In-app chat and job tracking
          {"\n"}• Secure payments and reviews
          {"\n\n"}
          SERVICETask empowers communities by simplifying the way people work together — whether it’s cleaning, repairs, deliveries, or freelance work.
        </Text>

        <Text style={styles.title}>Create your SERVICETask Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signupButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Login Redirect Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#121212', // dark theme background
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
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
  },
  featuresTitle: {
    fontWeight: 'bold',
    color: '#1a7431',
    fontSize: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a7431', // green accent
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#222',
    color: '#fff',
  },
  signupButton: {
    backgroundColor: '#1a7431',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#ff5252',
    marginBottom: 8,
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: '#aaa',
  },
  loginLink: {
    fontSize: 14,
    color: '#1a7431',
    fontWeight: 'bold',
  },
});
