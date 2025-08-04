import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar,
  BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { toast } from 'sonner-native';
import { ControllerCommands } from '../utils/BluetoothService';
import { useBluetooth } from '../utils/BluetoothContext';

const ControllerScreen = () => {
  const navigation = useNavigation();
  const { 
    connectedDevice, 
    disconnectFromDevice,
    sendCommand
  } = useBluetooth();
  
  // Handle back button press to disconnect
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleDisconnect();
        return true;
      };
      
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );
  
  // Check if device is connected, if not, redirect to device selection
  useEffect(() => {
    if (!connectedDevice) {
      // @ts-ignore - Navigation typing issue
      navigation.replace('DeviceSelection');
    }
  }, [connectedDevice]);
  
  // Handle disconnect button press
  const handleDisconnect = async () => {
    try {
      await disconnectFromDevice();
      // @ts-ignore - Navigation typing issue
      navigation.replace('DeviceSelection');
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };
  
  // Handle sending commands
  const handleSendCommand = async (command: any) => {
    try {
      await sendCommand(command);
    } catch (error) {
      toast.error('Failed to send command');
      console.error(error);
    }
  };

  // Directional control button component
  const DirectionalControl = ({ row, label }: { row: number, label: string }) => {
    return (
      <View style={styles.controlRow}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => handleSendCommand(row === 1 
            ? ControllerCommands.LEFT_ROW_1 
            : row === 2 
              ? ControllerCommands.LEFT_ROW_2 
              : ControllerCommands.LEFT_ROW_3)}
        >
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.rowLabel}>{label}</Text>
        
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => handleSendCommand(row === 1 
            ? ControllerCommands.RIGHT_ROW_1 
            : row === 2 
              ? ControllerCommands.RIGHT_ROW_2 
              : ControllerCommands.RIGHT_ROW_3)}
        >
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Bluetooth Controller</Text>
        <View style={styles.connectionStatus}>
          <View style={[styles.statusIndicator, styles.connected]} />
          <Text style={styles.statusText}>
            {connectedDevice ? `Connected: ${connectedDevice.name}` : 'Disconnected'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.disconnectButton}
          onPress={handleDisconnect}
        >
          <Text style={styles.disconnectButtonText}>Disconnect</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.controllerContainer}>
        <View style={styles.leftControls}>
          <DirectionalControl row={1} label="Row 1" />
          <DirectionalControl row={2} label="Row 2" />
          <DirectionalControl row={3} label="Row 3" />
        </View>
        
        <View style={styles.rightControls}>
          <TouchableOpacity 
            style={styles.functionButton}
            onPress={() => handleSendCommand(ControllerCommands.M1)}
          >
            <Text style={styles.functionButtonText}>M1</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.functionButton}
            onPress={() => handleSendCommand(ControllerCommands.HOME)}
          >
            <Text style={styles.functionButtonText}>⌂</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.functionButton}
            onPress={() => handleSendCommand(ControllerCommands.RESET)}
          >
            <Text style={styles.functionButtonText}>RESET</Text>
          </TouchableOpacity>
        </View>
      </View>
      
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  connected: {
    backgroundColor: '#4CAF50',
  },
  disconnected: {
    backgroundColor: '#F44336',
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
  },
  disconnectButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  disconnectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controllerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftControls: {
    flex: 2,
    justifyContent: 'space-around',
  },
  rightControls: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rowLabel: {
    color: '#fff',
    fontSize: 16,
    width: 60,
    textAlign: 'center',
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  functionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  functionButtonText: {
    color: '#fff',
    fontSize: 16,
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

export default ControllerScreen;
