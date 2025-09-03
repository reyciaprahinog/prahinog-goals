import { Tabs } from 'expo-router'
import { Ionicons } from "@expo/vector-icons"
import { GoalsProvider } from '../../contexts/goalsContexts'

export default function GoalsLayout() {

  return (
    <GoalsProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'grey',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Your Goals',
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                size={24} 
                name={focused ? 'home' : 'home-outline'} 
                color="#8ecae6"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create Goal',
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                size={24} 
                name={focused ? 'create' : 'create-outline'} 
                color="#8ecae6"
              />
            ),
          }}
        />
     </Tabs>
    </GoalsProvider>
  )
}
