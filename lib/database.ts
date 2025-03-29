import initialDishes from '@/data/initialDishes.json';
import { Dish } from '@/types/Dish';
import * as SQLite from 'expo-sqlite';

const openDatabase = () => {
  return SQLite.openDatabaseSync('database.db');
};

const insertDish = async (
  db: SQLite.SQLiteDatabase, 
  dish: { 
    id: number;
    name: string; 
    category: string; 
    description?: string; 
    details?: string;
  }
) => {
  try {
    await db.runAsync(
      'INSERT INTO dishes (id, name, category, description, details) VALUES (?, ?, ?, ?, ?);', 
      [dish.id, dish.name, dish.category, dish.description || '', dish.details || '']
    );
    console.log('Plato insertado');
  } catch (error) {
    console.error('Error al insertar plato:', error);
    throw error;
  }
};

const getDishes = async (db: SQLite.SQLiteDatabase, callback: (dishes: any[]) => void) => {
  try {
    const result = await db.getAllAsync('SELECT * FROM dishes;');
    callback(result);
  } catch (error) {
    console.error('Error al obtener los platos:', error);
    callback([]);
  }
};

const deleteDish = async (db: SQLite.SQLiteDatabase, id: number) => {
  try {
    await db.runAsync('DELETE FROM dishes WHERE id = ?;',
       id
    );
    console.log('Plato eliminado');
  } catch (error) {
    console.error('Error al eliminar plato:', error);
  }
};

const checkIfTableIsEmpty = async (db: SQLite.SQLiteDatabase): Promise<boolean> => {
  try {
    const result = await db.getAllAsync<{ count: number }>('SELECT COUNT(*) as count FROM dishes;');
    if (result && result.length > 0) {
      return result[0].count === 0;
    }
    return true; 
  } catch (error) {
    console.error('Error al verificar si la tabla está vacía:', error);
    return false; 
  }
};

const insertInitialDishes = async () => {
  const db = openDatabase();

  const isEmpty = await checkIfTableIsEmpty(db);

  if (isEmpty) {
    const initialDishesData: Dish[] = initialDishes.dishes; 

    try {
      for (const dish of initialDishesData) {
        await insertDish(db, dish);
      }
      console.log('Platos iniciales insertados correctamente');
    } catch (error) {
      console.error('Error insertando platos iniciales:', error);
    }
  } else {
    console.log('La base de datos ya contiene platos, no se insertan los iniciales.');
  }
};

export { deleteDish, getDishes, /**createTable,**/ insertDish, insertInitialDishes, openDatabase };

