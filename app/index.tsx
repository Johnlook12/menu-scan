import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Alert, TouchableOpacity, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DishCard from '../components/DishCard';
import SearchBar from '../components/SearchBar';
import { useRouter } from 'expo-router';
import { openDatabase, getDishes, insertInitialDishes, deleteDish } from '../lib/database';
import { FloatingAction } from "react-native-floating-action";
import { useFocusEffect } from 'expo-router';
import React from 'react';

export default function Index() {
  const router = useRouter();
  const [searchId, setSearchId] = useState('');
  const [filteredDishes, setFilteredDishes] = useState<any[]>([]);
  const [allDishes, setAllDishes] = useState<any[]>([]);
  const [db, setDb] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (id: number) => {
    Alert.alert(
      "Eliminar plato",
      "¿Estás seguro de que quieres eliminar este plato?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            if (db) {
              await deleteDish(db, id);
              getDishes(db, (dishesFromDb: any) => {
                setAllDishes(dishesFromDb);
                setFilteredDishes(dishesFromDb);
              });
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <DishCard dish={item} />
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      if (db) {
        getDishes(db, (dishesFromDb: any) => {
          setAllDishes(dishesFromDb);
          setFilteredDishes(dishesFromDb);
        });
      }
    }, [db])
  );

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        setIsLoading(true); 
        const database = await openDatabase();
        if (database) {
          setDb(database);
          await insertInitialDishes();
          await getDishes(database, (dishesFromDb: any) => {
            setAllDishes(dishesFromDb);
            setFilteredDishes(dishesFromDb);
          });
        }
      } catch (error) {
        console.error('Error initializing database:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDatabase();
  }, []);

  useEffect(() => {
    if (db) {
      getDishes(db, (dishesFromDb: any) => {
        setAllDishes(dishesFromDb);
      });
    }
  }, [db]);

  useEffect(() => {
    if (!searchId) {
      setFilteredDishes(allDishes); 
      return;
    }

    const numericId = parseInt(searchId);
    if (!isNaN(numericId)) {
      const result = allDishes.filter(dish => dish.id === numericId);
      setFilteredDishes(result);
    } else {
      setFilteredDishes([]);
    }
  }, [searchId, allDishes]);

  const actions = [
    {
      text: "Añadir Plato",
      icon: <Ionicons name="add" size={24} color="white" />,
      name: "bt_add",
      position: 1,
      color: '#2ecc71'
    }
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando menú...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={(id) => setSearchId(id)} />
      {filteredDishes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            ⚠️ No existe plato con ID {searchId}
          </Text>
          <TouchableOpacity onPress={() => setSearchId('')} style={styles.showAllButton}>
            <Text style={styles.showAllText}>Mostrar todos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredDishes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
      <FloatingAction
        actions={actions}
        onPressItem={() => router.push('./add-dish')}
        color="#2ecc71"
        distanceToEdge={20}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#f5f6fa'
  },
  list: {
    paddingBottom: 20
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    fontSize: 16,
    color: '#e74c3c',
    marginBottom: 20,
    textAlign: 'center'
  },
  showAllButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  showAllText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: 'white',
    paddingRight: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa'
  },
  loadingText: {
    fontSize: 18,
    color: '#2ecc71'
  }
});
