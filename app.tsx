import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from 'sonner-native';

// Import screens
import SplashScreen from "./screens/SplashScreen";
import DeviceSelectionScreen from "./screens/DeviceSelectionScreen";
import ControllerScreen from "./screens/ControllerScreen";

// Import Bluetooth provider
import { BluetoothProvider } from './utils/BluetoothContext';

// Define navigation stack types
export type RootStackParamList = {
  Splash: undefined;
  DeviceSelection: undefined;
  Controller: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="DeviceSelection" component={DeviceSelectionScreen} />
      <Stack.Screen name="Controller" component={ControllerScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <BluetoothProvider>
        <Toaster />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </BluetoothProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none",
    backgroundColor: '#000',
  }
});
