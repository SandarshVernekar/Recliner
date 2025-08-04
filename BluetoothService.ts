import { useState } from 'react';

// Types for Bluetooth functionality
export interface BluetoothDevice {
  id: string;
  name: string;
  isConnected: boolean;
}

export interface BluetoothCommand {
  type: 'direction' | 'function';
  action: string;
  value?: string | number;
}

// Mock Bluetooth service
export const useBluetoothService = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  
  // Mock scan for devices
  const scanForDevices = () => {
    setIsScanning(true);
    
    // Simulate finding devices after a delay
    setTimeout(() => {
      const mockDevices: BluetoothDevice[] = [
        { id: '1', name: 'Kärleson Controller', isConnected: false },
        { id: '2', name: 'BT Device 2', isConnected: false },
        { id: '3', name: 'BT Device 3', isConnected: false },
      ];
      
      setDevices(mockDevices);
      setIsScanning(false);
    }, 2000);
  };
  
  // Mock connect to device
  const connectToDevice = (deviceId: string): Promise<BluetoothDevice> => {
    return new Promise((resolve, reject) => {
      const device = devices.find(d => d.id === deviceId);
      
      if (!device) {
        reject(new Error('Device not found'));
        return;
      }
      
      // Simulate connection delay
      setTimeout(() => {
        const updatedDevice = { ...device, isConnected: true };
        
        // Update devices list
        setDevices(devices.map(d => 
          d.id === deviceId ? updatedDevice : d
        ));
        
        setConnectedDevice(updatedDevice);
        resolve(updatedDevice);
      }, 1500);
    });
  };
  
  // Mock disconnect from device
  const disconnectFromDevice = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!connectedDevice) {
        resolve();
        return;
      }
      
      // Simulate disconnection delay
      setTimeout(() => {
        // Update devices list
        setDevices(devices.map(d => 
          d.id === connectedDevice.id ? { ...d, isConnected: false } : d
        ));
        
        setConnectedDevice(null);
        resolve();
      }, 1000);
    });
  };
  
  // Mock send command to device
  const sendCommand = (command: BluetoothCommand): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!connectedDevice) {
        reject(new Error('No device connected'));
        return;
      }
      
      // Simulate command sending
      console.log(`Sending command to ${connectedDevice.name}:`, command);
      
      // Simulate success after delay
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  };
  
  return {
    isScanning,
    devices,
    connectedDevice,
    scanForDevices,
    connectToDevice,
    disconnectFromDevice,
    sendCommand,
  };
};

// Predefined commands for the controller
export const ControllerCommands = {
  // Directional commands
  LEFT_ROW_1: { type: 'direction', action: 'left', value: 1 } as BluetoothCommand,
  RIGHT_ROW_1: { type: 'direction', action: 'right', value: 1 } as BluetoothCommand,
  LEFT_ROW_2: { type: 'direction', action: 'left', value: 2 } as BluetoothCommand,
  RIGHT_ROW_2: { type: 'direction', action: 'right', value: 2 } as BluetoothCommand,
  LEFT_ROW_3: { type: 'direction', action: 'left', value: 3 } as BluetoothCommand,
  RIGHT_ROW_3: { type: 'direction', action: 'right', value: 3 } as BluetoothCommand,
  
  // Function commands
  M1: { type: 'function', action: 'm1' } as BluetoothCommand,
  HOME: { type: 'function', action: 'home' } as BluetoothCommand,
  RESET: { type: 'function', action: 'reset' } as BluetoothCommand,
};
