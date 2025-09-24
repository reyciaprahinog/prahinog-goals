import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig';

export default function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSignup = async () => {
		setError('');
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}
		setLoading(true);
		const auth = getAuth(app);
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			// TODO: Navigate to goals or home screen
		} catch (err) {
			setError(err.message);
		}
		setLoading(false);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign Up</Text>
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
			<TextInput
				style={styles.input}
				placeholder="Confirm Password"
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				secureTextEntry
			/>
			{error ? <Text style={styles.error}>{error}</Text> : null}
			<TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
				{loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
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
		backgroundColor: '#28a745',
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
