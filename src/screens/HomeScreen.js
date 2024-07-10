// screens/HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { analytics, crashlytics, perf } from '../../firebase';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    analytics().logScreenView({ screen_name: 'HomeScreen' });

    const trace = perf().newTrace('HomeScreen_render');
    trace.start();

    return () => {
      trace.stop();
    };
  }, []);

  const handleCrash = () => {
    crashlytics().log('User triggered crash');
    crashlytics().crash();
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          analytics().logEvent('navigate_to_details');
          navigation.navigate('Details');
        }}
      />
      <Button
        title="Go to Config"
        onPress={() => {
          analytics().logEvent('navigate_to_config');
          navigation.navigate('Config');
        }}
      />
      <Button
        title="Trigger Crash"
        onPress={handleCrash}
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

export default HomeScreen;
