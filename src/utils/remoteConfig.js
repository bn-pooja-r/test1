import remoteConfig from '@react-native-firebase/remote-config';
import { getLocalEnvironments, storeAppTheme, storeEnvironment, storeEnvironmentType } from './environmentFunctions'; 

const setupRemoteConfig = async (currentEnvironment) => {
  let localEnvironments = getLocalEnvironments();

  await remoteConfig().setConfigSettings({
    minimumFetchIntervalMillis: 300000, // 5 minutes
  });

  await remoteConfig().setDefaults({ ...localEnvironments, theme: 'defaultTheme' });

  try {
    const fetchedRemotely = await remoteConfig().fetchAndActivate();
    if (fetchedRemotely) {
      const themeName = remoteConfig().getValue('theme').asString();
      await storeAppTheme(themeName);
    }
    const environment = remoteConfig().getValue(`env_${currentEnvironment}`).asString();
    await storeEnvironment(environment);
    await storeEnvironmentType(currentEnvironment);
    return environment;
  } catch (error) {
    const environment = remoteConfig().getValue(`env_${currentEnvironment}`).asString();
    await storeEnvironment(environment);
    await storeEnvironmentType(currentEnvironment);
    console.log('Error activating remote config:', error);
    return environment;
  }
};

export const fetchStoredEnvironment = async (currentEnvironment) => {
  console.log('Current environment switched to', currentEnvironment);
  return await setupRemoteConfig(currentEnvironment);
};
