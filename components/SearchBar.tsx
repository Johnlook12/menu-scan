import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function SearchBar({ onSearch }: { onSearch: (id: string) => void }) {
  const [searchId, setSearchId] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese ID del plato"
        placeholderTextColor={'#aaa'}
        keyboardType="numeric"
        value={searchId}
        onChangeText={setSearchId}
      />
      <Button
        title="Buscar"
        onPress={() => onSearch(searchId)}
        color="#2ecc71"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',

  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  }
});