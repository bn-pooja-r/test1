// screens/ConfigScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { analytics, remoteConfig } from '../../firebase';

const ConfigScreen = ({ navigation }) => {
  const [welcomeMessage, setWelcomeMessage] = useState('Welcome to the Config Screen!');

  useEffect(() => {
    analytics().logScreenView({ screen_name: 'ConfigScreen' });

    const fetchRemoteConfig = async () => {
      try {
        await remoteConfig().setDefaults({
          welcome_message: 'Welcome to the default Config Screen!',
        });
        await remoteConfig().fetchAndActivate();
        const fetchedMessage = remoteConfig().getValue('welcome_message').asString();
        setWelcomeMessage(fetchedMessage);
      } catch (error) {
        console.error('Error fetching remote config:', error);
      }
    };

    fetchRemoteConfig();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{welcomeMessage}</Text>
      <Button
        title="Go back"
        onPress={() => {
          analytics().logEvent('navigate_back_home_from_config');
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConfigScreen;
