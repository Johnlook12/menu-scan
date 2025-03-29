import { Slot, Stack } from 'expo-router';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function RootLayout() {
  const router = useRouter();
  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    try {
      await db.execAsync(
        'CREATE TABLE IF NOT EXISTS dishes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, category TEXT, description TEXT, details TEXT);'
      );
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };

  return (
    <SQLiteProvider databaseName={'database.db'} onInit={createDbIfNeeded}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: '🍔 Menú Restaurante',
            headerStyle: { backgroundColor: '#2ecc71' },
            headerTintColor: 'white',
            // headerRight: () => (
            //   <TouchableOpacity 
            //     style={{ marginRight: 15 }}
            //     onPress={() => router.push('./add-dish')}
            //   >
            //     <Ionicons name="add" size={28} color="white" />
            //   </TouchableOpacity>
            // )
          }}
        />
        <Stack.Screen
          name="add-dish"
          options={{
            title: '➕ Nuevo Plato',
            headerStyle: { backgroundColor: '#2ecc71' },
            headerTintColor: 'white'
          }}
        />
        <Slot />
      </Stack>
    </SQLiteProvider>
  );
}
