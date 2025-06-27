import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar onPlaceSelected={handlePlaceSelect} />
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
        <ScrollView style={styles.historyContainer}>
          <HistoryList history={history} onSelect={handlePlaceSelect} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  historyContainer: { backgroundColor: '#fff' },
});
