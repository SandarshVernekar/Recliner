import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { toast } from 'sonner-native';
import { BluetoothDevice } from '../utils/BluetoothService';
import { useBluetooth } from '../utils/BluetoothContext';

const DeviceSelectionScreen = () => {
  const navigation = useNavigation();
  const { 
    isScanning, 
    devices, 
    scanForDevices, 
    connectToDevice 
  } = useBluetooth();
  
  // Start scanning when the screen loads
  useEffect(() => {
    scanForDevices();
  }, []);
  
  // Handle device connection
  const handleConnectToDevice = async (device: BluetoothDevice) => {
    try {
      toast.loading(`Connecting to ${device.name}...`);
      await connectToDevice(device.id);
      toast.success(`Connected to ${device.name}`);
      // @ts-ignore - Navigation typing issue
      navigation.navigate('Controller');
    } catch (error) {
      toast.error('Failed to connect to device');
      console.error(error);
    }
  };
  
  // Render each device item
  const renderDeviceItem = ({ item }: { item: BluetoothDevice }) => (
    <TouchableOpacity 
      style={styles.deviceItem}
      onPress={() => handleConnectToDevice(item)}
      disabled={item.isConnected}
    >
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{item.name}</Text>
        <Text style={styles.deviceId}>ID: {item.id}</Text>
      </View>
      
      {item.isConnected ? (
        <View style={styles.connectedBadge}>
          <Text style={styles.connectedText}>Connected</Text>
        </View>
      ) : (
        <View style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Connect</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Bluetooth Devices</Text>
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={scanForDevices}
          disabled={isScanning}
        >
          <Text style={styles.scanButtonText}>
            {isScanning ? 'Scanning...' : 'Scan for Devices'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {isScanning && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Scanning for devices...</Text>
        </View>
      )}
      
      {!isScanning && devices.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No devices found</Text>
          <Text style={styles.emptySubtext}>
            Make sure your Bluetooth device is turned on and in range
          </Text>
        </View>
      )}
      
      {devices.length > 0 && (
        <FlatList
          data={devices}
          renderItem={renderDeviceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.deviceList}
        />
      )}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Kärleson</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scanButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
  deviceList: {
    flexGrow: 1,
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deviceId: {
    color: '#aaa',
    fontSize: 12,
  },
  connectButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  connectedBadge: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  connectedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DeviceSelectionScreen;
