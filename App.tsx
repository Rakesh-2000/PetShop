import { View, Text } from 'react-native';
import React from 'react';
import HomeScreen from './src/Screens/HomeScreen';
import AppNavigator from './src/Navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </View>
  );
};

export default App;
