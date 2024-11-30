import { Stack } from "expo-router";
import "../global.css";

const RootLayout = () => {

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="NumberAdding" options={{ headerShown: false }} />
      <Stack.Screen name="OTP" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
