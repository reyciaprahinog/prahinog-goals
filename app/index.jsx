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
