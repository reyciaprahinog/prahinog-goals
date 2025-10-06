import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setPassword('');
      router.replace('/home1'); // redirect after successful login
    } catch (error) {
      setErrorMsg(error.message);
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

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Button title="Login" onPress={handleLogin} />
          )}
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signupLink}> Sign up</Text>
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
    backgroundColor: '#f0f4f8',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
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
    color: '#444',
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
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  buttonContainer: {
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: {
    fontSize: 14,
    color: '#444',
  },
  signupLink: {
    fontSize: 14,
    color: '#1e90ff',
    fontWeight: 'bold',
  },
});
