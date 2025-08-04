import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Switch,
  ScrollView,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { toast } from 'sonner-native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  
  // Settings state
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoConnect, setAutoConnect] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [commandDelay, setCommandDelay] = useState('medium');
  
  // Handle back button
  const handleBack = () => {
    // @ts-ignore - Navigation typing issue
    navigation.goBack();
  };
  
  // Handle saving settings
  const handleSaveSettings = () => {
    // In a real app, this would save to AsyncStorage or similar
    toast.success('Settings saved successfully');
    handleBack();
  };
  
  // Handle command delay selection
  const handleCommandDelayChange = (delay: string) => {
    setCommandDelay(delay);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#2196F3' }}
              thumbColor={darkMode ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Auto-connect to last device</Text>
            <Switch
              value={autoConnect}
              onValueChange={setAutoConnect}
              trackColor={{ false: '#767577', true: '#2196F3' }}
              thumbColor={autoConnect ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feedback</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Vibration</Text>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: '#767577', true: '#2196F3' }}
              thumbColor={vibrationEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Sound</Text>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#767577', true: '#2196F3' }}
              thumbColor={soundEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Command Delay</Text>
          
          <View style={styles.commandDelayOptions}>
            <TouchableOpacity
              style={[
                styles.delayOption,
                commandDelay === 'none' && styles.delayOptionSelected
              ]}
              onPress={() => handleCommandDelayChange('none')}
            >
              <Text style={[
                styles.delayOptionText,
                commandDelay === 'none' && styles.delayOptionTextSelected
              ]}>None</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.delayOption,
                commandDelay === 'low' && styles.delayOptionSelected
              ]}
              onPress={() => handleCommandDelayChange('low')}
            >
              <Text style={[
                styles.delayOptionText,
                commandDelay === 'low' && styles.delayOptionTextSelected
              ]}>Low</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.delayOption,
                commandDelay === 'medium' && styles.delayOptionSelected
              ]}
              onPress={() => handleCommandDelayChange('medium')}
            >
              <Text style={[
                styles.delayOptionText,
                commandDelay === 'medium' && styles.delayOptionTextSelected
              ]}>Medium</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.delayOption,
                commandDelay === 'high' && styles.delayOptionSelected
              ]}
              onPress={() => handleCommandDelayChange('high')}
            >
              <Text style={[
                styles.delayOptionText,
                commandDelay === 'high' && styles.delayOptionTextSelected
              ]}>High</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.delayDescription}>
            {commandDelay === 'none' && 'No delay between commands (may cause issues with some devices)'}
            {commandDelay === 'low' && 'Minimal delay between commands (50ms)'}
            {commandDelay === 'medium' && 'Standard delay between commands (100ms)'}
            {commandDelay === 'high' && 'Longer delay between commands (200ms) for more reliable operation'}
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Developer</Text>
            <Text style={styles.aboutValue}>Kärleson</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveSettings}
        >
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingLabel: {
    color: '#fff',
    fontSize: 16,
  },
  commandDelayOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  delayOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: '#333',
    borderRadius: 4,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  delayOptionSelected: {
    backgroundColor: '#2196F3',
  },
  delayOptionText: {
    color: '#fff',
    fontSize: 14,
  },
  delayOptionTextSelected: {
    fontWeight: 'bold',
  },
  delayDescription: {
    color: '#aaa',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  aboutLabel: {
    color: '#fff',
    fontSize: 16,
  },
  aboutValue: {
    color: '#aaa',
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
