import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const randomTasks = [
  'Clean the office',
  'Design a company logo',
  'Prepare a project proposal',
  'Schedule a client meeting',
  'Update the website',
  'Write a blog post',
  'Organize inventory',
  'Respond to customer emails',
  'Conduct a market survey',
  'Deliver a package',
  'Repair equipment',
  'Plan a marketing campaign',
  'Train new staff',
  'Manage social media accounts',
  'Prepare an invoice',
  'Test a new feature',
  'Set up a workstation',
  'Arrange catering for event',
  'Review service feedback',
  'Follow up with clients',
];

export default function NotFound() {
  const router = useRouter();

  // Pick 3 random tasks to display
  const shuffled = randomTasks.sort(() => 0.5 - Math.random());
  const sampleTasks = shuffled.slice(0, 3);

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={80} color="#ff9800" style={styles.icon} />
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.subtitle}>Sorry, the page you are looking for doesn't exist.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
      <Text style={styles.sitemap}>• Sitemap •</Text>
      <View style={styles.links}>
        <TouchableOpacity onPress={() => router.replace('/dashboard')}>
          <Text style={styles.link}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/taskform')}>
          <Text style={styles.link}>Create Task</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/calendar')}>
          <Text style={styles.link}>Calendar View</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.randomTitle}>Try one of these random tasks:</Text>
      {sampleTasks.map((task, idx) => (
        <Text key={idx} style={styles.randomTask}>• {task}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eaf6f6', alignItems: 'center', justifyContent: 'center', padding: 24 },
  icon: { marginBottom: 18 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#ff9800', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 24, textAlign: 'center' },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#21cc8d', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 28, marginBottom: 24 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  sitemap: { color: '#888', fontSize: 15, marginBottom: 8 },
  links: { flexDirection: 'row', gap: 18, marginBottom: 18 },
  link: { color: '#007bff', fontSize: 16, fontWeight: 'bold', marginHorizontal: 8 },
  randomTitle: { fontSize: 16, color: '#21cc8d', fontWeight: 'bold', marginTop: 18, marginBottom: 6 },
  randomTask: { fontSize: 15, color: '#333', marginBottom: 2 },
});