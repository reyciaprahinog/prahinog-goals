<<<<<<< HEAD
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
      router.replace('/home1');
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

        <Text style={styles.title}>Login to SERVICETask</Text>

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
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

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
    backgroundColor: '#121212',
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
    fontSize: 26,
    marginBottom: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a7431',
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
  loginButton: {
    backgroundColor: '#1a7431',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#ff5252',
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
    color: '#aaa',
  },
  signupLink: {
    fontSize: 14,
    color: '#1a7431',
    fontWeight: 'bold',
  },
=======
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig';
import * as Notifications from 'expo-notifications';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleLogin = async () => {
		setLoading(true);
		setError('');
		const auth = getAuth(app);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			// TODO: Navigate to goals or home screen
		} catch (err) {
			setError(err.message);
		}
		setLoading(false);
	};

	const scheduleTaskReminder = async (title, dueDate) => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: 'Task Reminder',
				body: `Don\'t forget: ${title} is due on ${dueDate}`,
			},
			trigger: { date: new Date(dueDate + 'T09:00:00') },
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Log In</Text>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			{error ? <Text style={styles.error}>{error}</Text> : null}
			<TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
				{loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log In</Text>}
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 24,
		color: '#333',
	},
	input: {
		width: '100%',
		height: 48,
		backgroundColor: '#fff',
		borderRadius: 8,
		paddingHorizontal: 16,
		marginBottom: 16,
		fontSize: 16,
		borderWidth: 1,
		borderColor: '#ccc',
	},
	button: {
		backgroundColor: '#007bff',
		paddingVertical: 12,
		borderRadius: 8,
		width: '100%',
		alignItems: 'center',
		marginTop: 8,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	error: {
		color: 'red',
		marginBottom: 8,
		textAlign: 'center',
	},
>>>>>>> 39e2899829d23884b84fa5f82975be06b6039c12
});
