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
});
