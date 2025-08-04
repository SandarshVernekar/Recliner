import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  StatusBar,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  
  useEffect(() => {
    // Navigate to the device selection screen after a delay
    const timer = setTimeout(() => {
      // @ts-ignore - Navigation typing issue
      navigation.replace('DeviceSelection');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.content}>
        <Text style={styles.title}>UTSPL</Text>
        <Text style={styles.subtitle}>Bluetooth Controller</Text>
        
        <View style={styles.logoContainer}>
          {/* This would be replaced with an actual logo */}
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>K</Text>
          </View>
        </View>
        
        <ActivityIndicator 
          size="large" 
          color="#fff" 
          style={styles.loader}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 48,
  },
  logoContainer: {
    marginBottom: 48,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  logoText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
  },
  loader: {
    marginTop: 32,
  },
});

export default SplashScreen;
