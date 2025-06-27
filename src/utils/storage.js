import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'searchHistory';

export const saveToHistory = async (place) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const history = existing ? JSON.parse(existing) : [];
    const updatedHistory = [place, ...history.filter(p => p.id !== place.id)];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory.slice(0, 20)));
  } catch (e) {
    console.error('Error saving history:', e);
  }
};

export const getHistory = async () => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch (e) {
    console.error('Error fetching history:', e);
    return [];
  }
};
