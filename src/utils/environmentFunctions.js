import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocalEnvironments = () => {
  return {
    env_DEV: JSON.stringify({
      API_URL: 'https://dev.example.com/api',
      START_MAINTENANCE: '2024-01-01T00:00:00Z',
      END_MAINTENANCE: '2024-01-01T01:00:00Z',
    }),
    env_PROD: JSON.stringify({
      API_URL: 'https://prod.example.com/api',
      START_MAINTENANCE: '2024-01-01T00:00:00Z',
      END_MAINTENANCE: '2024-01-01T01:00:00Z',
    }),
  };
};

export const storeAppTheme = async (theme) => {
  try {
    await AsyncStorage.setItem('@app_theme', theme);
  } catch (error) {
    console.error('Error storing app theme:', error);
  }
};

export const storeEnvironment = async (environment) => {
  try {
    await AsyncStorage.setItem('@environment', environment);
  } catch (error) {
    console.error('Error storing environment:', error);
  }
};

export const storeEnvironmentType = async (environmentType) => {
  try {
    await AsyncStorage.setItem('@environment_type', environmentType);
  } catch (error) {
    console.error('Error storing environment type:', error);
  }
};

export const getEnvironmentType = async () => {
  try {
    return await AsyncStorage.getItem('@environment_type');
  } catch (error) {
    console.error('Error getting environment type:', error);
    return null;
  }
};
