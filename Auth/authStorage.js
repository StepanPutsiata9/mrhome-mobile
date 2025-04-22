import * as Keychain from 'react-native-keychain';

export const storeTokens = async (accessToken, refreshToken) => {
  try {
    await Keychain.setGenericPassword('auth', JSON.stringify({
      accessToken,
      refreshToken
    }));
    return true;
  } catch (error) {
    console.error('Error storing tokens:', error);
    return false;
  }
};

export const getTokens = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return JSON.parse(credentials.password);
    }
    return null;
  } catch (error) {
    console.error('Error getting tokens:', error);
    return null;
  }
};

export const clearTokens = async () => {
  try {
    await Keychain.resetGenericPassword();
    return true;
  } catch (error) {
    console.error('Error clearing tokens:', error);
    return false;
  }
};