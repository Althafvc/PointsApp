import { useRouter } from "expo-router";
import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeLayout() {
  const router = useRouter();
  const email = '123@gmail.com'

  // Function to handle navigation to the profile screen with query parameter
  const navigateToProfile = () => {
    // Navigate to profile screen with email query
    router.push({
      pathname: '/profile',
      params: { email:'123@gmail.com' },
    });
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Apply globally to all screens
        tabBarStyle: {
          backgroundColor: "white", // Customize tab bar background
          borderTopWidth: 0, // Optional: Remove top border
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarOnPress: navigateToProfile, // Navigate with email query on tab press
        }}
      />
    </Tabs>
  );
}
