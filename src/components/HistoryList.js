import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function HistoryList({ history, onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
            <Text style={styles.placeName}>{item.name}</Text>
            <Text style={styles.placeAddress}>{item.address}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  item: { paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ccc' },
  placeName: { fontSize: 16, fontWeight: '600' },
  placeAddress: { fontSize: 14, color: '#555' },
});
