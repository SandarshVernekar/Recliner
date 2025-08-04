import React, { createContext, useContext, ReactNode } from 'react';
import { useBluetoothService } from './BluetoothService';

// Create context
const BluetoothContext = createContext<ReturnType<typeof useBluetoothService> | undefined>(undefined);

// Provider component
export const BluetoothProvider = ({ children }: { children: ReactNode }) => {
  const bluetoothService = useBluetoothService();
  
  return (
    <BluetoothContext.Provider value={bluetoothService}>
      {children}
    </BluetoothContext.Provider>
  );
};

// Custom hook to use the Bluetooth context
export const useBluetooth = () => {
  const context = useContext(BluetoothContext);
  
  if (context === undefined) {
    throw new Error('useBluetooth must be used within a BluetoothProvider');
  }
  
  return context;
};
