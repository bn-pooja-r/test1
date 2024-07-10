import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { analytics, crashlytics, perf } from '../../firebase';

const DetailsScreen = ({ navigation }) => {
  useEffect(() => {
    analytics().logScreenView({ screen_name: 'DetailsScreen' });

    const trace = perf().newTrace('DetailsScreen_render');
    trace.start();

    return () => {
      trace.stop();
    };
  }, []);

  const handleCustomError = () => {
    try {
      throw new Error('Custom error for testing');
    } catch (error) {
      crashlytics().recordError(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="Go back"
        onPress={() => {
          analytics().logEvent('navigate_back_home');
          navigation.goBack();
        }}
      />
      <Button
        title="Log Custom Error"
        onPress={handleCustomError}
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

export default DetailsScreen;
