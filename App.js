import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ConfigScreen from './src/screens/ConfigScreen';
import { fetchStoredEnvironment } from './src/utils/remoteConfig';

const Stack = createStackNavigator();

const App = () => {
  

  useEffect(() => {
    const fetchRemoteConfigs = async () => {
      const env = await fetchStoredEnvironment(__DEV__ ? 'DEV' : 'PROD');
      if (env) {
        const envJson = JSON.parse(env);
        
      }
    };

    fetchRemoteConfigs();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Config" component={ConfigScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
