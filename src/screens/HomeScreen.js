import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SearchBar from '../components/SearchBar';
import HistoryList from '../components/HistoryList';
import { saveToHistory, getHistory } from '../utils/storage';

export default function HomeScreen() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [history, setHistory] = useState([]);
  const mapRef = useRef(null);

  const handlePlaceSelect = async (place) => {
    setSelectedPlace(place);
    await saveToHistory(place);
    const updatedHistory = await getHistory();
    setHistory(updatedHistory);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...place.location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  useEffect(() => {
    const loadHistory = async () => {
      const storedHistory = await getHistory();
      setHistory(storedHistory);
    };
    loadHistory();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar onPlaceSelected={handlePlaceSelect} />
        </View>

        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {selectedPlace && (
            <Marker
              coordinate={selectedPlace.location}
              title={selectedPlace.name}
              description={selectedPlace.address}
            />
          )}
        </MapView>

        <View style={styles.historyContainer}>
          <HistoryList history={history} onSelect={handlePlaceSelect} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 10,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  map: {
    flex: 0.6,
    marginTop: 80,
    marginHorizontal: 11,
    borderRadius: 16,
    overflow: 'hidden',
  },
  historyHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  historyContainer: {
    flex: 0.4,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 16,
    top:10
  },
});
