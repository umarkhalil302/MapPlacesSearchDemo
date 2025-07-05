import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '@env';

export default function SearchBar({ onPlaceSelected }) {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search for a place"
      fetchDetails={true}
      onPress={(data, details = null) => {
        if (details) {
          const { name, formatted_address, geometry, place_id } = details;
          onPlaceSelected({
            id: place_id,
            name,
            address: formatted_address,
            location: {
              latitude: geometry.location.lat,
              longitude: geometry.location.lng,
            },
          });
        }
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: 'en',
      }}
      styles={{
        container: { flex: 0 },
        textInputContainer: { backgroundColor: 'white' },
        textInput: { height: 44, color: '#5d5d5d', fontSize: 16 },
      }}
      debounce={300}
      predefinedPlaces={[]}
      // 🚨 THIS LINE prevents your crash:
      textInputProps={{}} 
    />
  );
}
