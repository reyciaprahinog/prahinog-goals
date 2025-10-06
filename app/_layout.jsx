<<<<<<< HEAD
import { Slot } from 'expo-router';

export default function Layout() {
  return <Slot />;
=======
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="goals" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  )
>>>>>>> 39e2899829d23884b84fa5f82975be06b6039c12
}