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
            <View style={styles.itemContent}>
              <Text style={styles.placeName}>{item.name}</Text>
              <Text style={styles.placeAddress}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12, color: '#333' },
  item: { paddingVertical: 14 },
  itemContent: {},
  placeName: { fontSize: 16, fontWeight: '600', color: '#222' },
  placeAddress: { fontSize: 13, color: '#777', marginTop: 2 },
  separator: { height: 1, backgroundColor: '#eee' },
});
