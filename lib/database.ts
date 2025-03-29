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
    description: string; 
    details: string;
  }
) => {
  try {
    await db.runAsync(
      'INSERT INTO dishes (id, name, category, description, details) VALUES (?, ?, ?, ?, ?);', 
      [dish.id, dish.name, dish.category, dish.description, dish.details]
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
    const initialDishes = [
      {
        "id": 1,
        "name": "ENSALADA TRES DELICIAS",
        "category": "Ensalada",
        "description": "",
        "details": ""
      },
      {
        "id": 2,
        "name": "ENSALADA CHINA",
        "category": "Ensalada",
        "description": "",
        "details": ""
      },
      {
        "id": 3,
        "name": "SOPA DE LANGOSTA",
        "category": "Sopa",
        "description": "4 gambas , tomate cuadrado , cebolla",
        "details": "picado"
      },
      {
        "id": 4,
        "name": "SOPA DE MAÍZ",
        "category": "Sopa",
        "description": "maíz , pollo fino",
        "details": "fino"
      },
      {
        "id": 5,
        "name": "SOPA DE VERDURAS",
        "category": "Sopa",
        "description": "champiñón picado , maíz normal , zanahoria pequeña , calabacín , apio",
        "details": "picado chiquito"
      },
      {
        "id": 6,
        "name": "SOPA DE AJO Y HUEVO",
        "category": "Sopa",
        "description": "jamón cuadrado , clara de huevo , pollo fino , adorno de alga blanca",
        "details": ""
      },
      {
        "id": 8,
        "name": "SOPA AGRIPICANTE",
        "category": "Sopa",
        "description": "cerdo , col , zanahoria pequeña , huevo",
        "details": "picado"
      },
      {
        "id": 9,
        "name": "SOPA DE POLLO CON CHAMPIÑÓN",
        "category": "Sopa",
        "description": "pollo fino , champiñones",
        "details": "picado"
      },
      {
        "id": 10,
        "name": "SOPA DE WANTUN",
        "category": "Sopa",
        "description": "6 wantun , huevo tiras 2 ruedas",
        "details": ""
      },
      {
        "id": 11,
        "name": "SOPA DE FIDEO CHINO",
        "category": "Sopa",
        "description": "fideo chino , pollo , jamón",
        "details": "fino del 2"
      },
      {
        "id": 12,
        "name": "DOUFU CON SALSA MARINERA",
        "category": "Doufu",
        "description": "doufu cuadrado , champiñón , cebolla , bambú",
        "details": "laminado"
      },
      {
        "id": 13,
        "name": "POLLO VEGETAL CON SALSA DE BARBACOA",
        "category": "Pollo",
        "description": "carne vegetal , bambú laminado , puerro fino , cebolla fina",
        "details": ""
      },
      {
        "id": 14,
        "name": "FIDEO CHINO CON VERDURAS",
        "category": "Fideo",
        "description": "fideo chino , apio , zanahoria , cebolla , bambú , calabacin",
        "details": "tiras"
      },
      {
        "id": 15,
        "name": "CARNE VEGETAL CON SALSA AGRIDULCE",
        "category": "Carne",
        "description": "tempura de carne vegetal rebozada , piña",
        "details": ""
      },
      {
        "id": 16,
        "name": "BROTES DE SOJA CON RÁBANO PICANTE",
        "category": "Ternera",
        "description": "ternera fina , brotes de soja , rábano picante",
        "details": ""
      },
      {
        "id": 17,
        "name": "MANCHURIA",
        "category": "Vegetal",
        "description": "7 albóndiga vegetal",
        "details": ""
      },
      {
        "id": 18,
        "name": "BUDA FELIZ",
        "category": "Vegetal",
        "description": "carne veg . , calabacín , zanahoria , champiñón , bambú",
        "details": "laminado"
      },
      {
        "id": 19,
        "name": "VERDURAS AL CURRY",
        "category": "Verduras",
        "description": "calabacin , cebolla , zanahoria , col , champiñones , setas",
        "details": "laminado"
      },
      {
        "id": 20,
        "name": "SETAS CON BAMBÚ Y SALSA MARINERA",
        "category": "Setas",
        "description": "setas , bambú",
        "details": "laminado"
      },
      {
        "id": 21,
        "name": "CHOP SUEY DE CARNE",
        "category": "Carne",
        "description": "cerdo , col , cebolla , zanahoria , apio , bambú , calabacín",
        "details": "fino"
      },
      {
        "id": 22,
        "name": "CHOP SUEY DE POLLO",
        "category": "Pollo",
        "description": "pollo , col , cebolla , zanahoria , apio , bambú , calabacin",
        "details": "fino"
      },
      {
        "id": 23,
        "name": "CHOP SUEY DE GAMBA",
        "category": "Gamba",
        "description": "9 gambas , col , cebolla , zanahoria , apio , bambú , calabacín",
        "details": "fino"
      },
      {
        "id": 24,
        "name": "CHOP SUEY DE VERDURA",
        "category": "Verdura",
        "description": "col , cebolla , zanahoria , apio , bambú , calabacín , champiñón",
        "details": "fino"
      },
      {
        "id": 25,
        "name": "FANTASÍA MANDARIN",
        "category": "Otros",
        "description": "cerdo dado , 5 gambas , calamares , pollo dado , pescado tempura , palitos de cangrejo , cebolla , zanahoria , calabacin , bambú",
        "details": "verdura laminada"
      },
      {
        "id": 26,
        "name": "HUEVO REVUELTO CON GAMBAS",
        "category": "Huevo",
        "description": "9-10 gambas , 4 huevos , cebolla , zanahoria",
        "details": "verdura fina"
      },
      {
        "id": 27,
        "name": "HUEVO FUYUN",
        "category": "Huevo",
        "description": "7 gambas , jamón , pollo , huevo , cebolla , zanahoria",
        "details": "verdura fina"
      },
      {
        "id": 28,
        "name": "ARROZ CON CARNE",
        "category": "Arroz",
        "description": "arroz , cerdo , zanahoria pequeña F",
        "details": "fino"
      },
      {
        "id": 29,
        "name": "ARROZ CON POLLO",
        "category": "Arroz",
        "description": "arroz , pollo , zanahoria pequeña RENA",
        "details": "fino"
      },
      {
        "id": 30,
        "name": "ARROZ TRES DELICIAS",
        "category": "Arroz",
        "description": "arroz , ternera , jamón , pollo tiras , zanahoria pequeña",
        "details": "dado"
      },
      {
        "id": 31,
        "name": "ARROZ CON GAMBAS",
        "category": "Arroz",
        "description": "arroz , 9 gambas , zanahoria pequeña .",
        "details": ""
      },
      {
        "id": 32,
        "name": "ARROZ CON CURRY Y TERNERA",
        "category": "Arroz",
        "description": "ternera , zanahoria , calabacín , cebolla , arroz blanco aparte",
        "details": "laminado"
      },
      {
        "id": 33,
        "name": "ARROZ CON CURRY Y POLLO",
        "category": "Arroz",
        "description": "pollo , zanahoria , calabacin , cebolla , arroz blanco aparte",
        "details": "laminado"
      },
      {
        "id": 34,
        "name": "ARROZ CON CURRY Y GAMBAS",
        "category": "Arroz",
        "description": "9 gambas , zanahoria , calabacín , cebolla , arroz blanco aparte",
        "details": "laminado"
      },
      {
        "id": 35,
        "name": "ARROZ CON HUEVO",
        "category": "Arroz",
        "description": "",
        "details": ""
      },
      {
        "id": 36,
        "name": "WANTÚN FRITO",
        "category": "Otros",
        "description": "",
        "details": ""
      },
      {
        "id": 37,
        "name": "ROLLO DE PRIMAVERA",
        "category": "Otros",
        "description": "",
        "details": ""
      },
      {
        "id": 38,
        "name": "TALLARINES CON CARNE",
        "category": "Tallarines",
        "description": "cerdo , tallarines , col , cebolla , calabacín , zanahoria , apio , bambú",
        "details": "fino"
      },
      {
        "id": 39,
        "name": "TALLARINES CON POLLO",
        "category": "Tallarines",
        "description": "fie podis , taltarines , col , cebolla , calabacin , zanahoria , apio , bambú",
        "details": "fino"
      },
      {
        "id": 40,
        "name": "TALLARINES CON GAMBA",
        "category": "Tallarines",
        "description": "9 gambas , tallarines , col , cebolla , calabacín , zanahoria , apio , bambú",
        "details": "fino"
      },
      {
        "id": 41,
        "name": "TALLARINES TRES DELICIAS",
        "category": "Tallarines",
        "description": "8 gambas , calamares , cerdo cuadrado , tallarines , col , cebolla , calabacín , zanahoria , apio , bambú , b",
        "details": "laminado"
      },
      {
        "id": 42,
        "name": "FIDEO DE ARROZ TRES DELICIAS",
        "category": "Fideo de Arroz",
        "description": "9 gambas , cerdo , calamar , fideo de arroz , cebolla , calabacín , zanahoria , apio , bambú",
        "details": "fino"
      },
      {
        "id": 43,
        "name": "PATA DE CANGREJO CON SALSA MARINERA",
        "category": "Cangrejo",
        "description": "cangrejo , cebolla , pimiento verde , jengibre",
        "details": "verdura laminada"
      },
      {
        "id": 44,
        "name": "CALAMARES SALTEADOS AL ESTILO CHINO",
        "category": "Calamares",
        "description": "calamares , cebolla , bambú , champiñón",
        "details": "verdura laminada"
      },
      {
        "id": 45,
        "name": "PESCADO AGRIDULCE",
        "category": "Pescado",
        "description": "pescado , cebolla , piña , pimiento",
        "details": "laminado"
      },
      {
        "id": 46,
        "name": "PESCADO CON SALSA CHINA",
        "category": "Pescado",
        "description": "pescado , champiñón , cebolla laminada",
        "details": ""
      },
      {
        "id": 47,
        "name": "LANGOSTINO CON SALSA DE MARISCO",
        "category": "Langostino",
        "description": "langostino , zanahoria , champiñones",
        "details": "verdura laminada"
      },
      {
        "id": 48,
        "name": "GAMBAS FRITAS CON RIÑONES",
        "category": "Gambas",
        "description": "8 gambas , riñones con maicena , cebolla , bambú , pimiento",
        "details": "laminado"
      },
      {
        "id": 49,
        "name": "GAMBAS SALTEADAS TRES DELICIAS",
        "category": "Gambas",
        "description": "9 gambas , pescado , calamares , palo de cangrejo , cerdo dado , cebolla laminada",
        "details": ""
      },
      {
        "id": 50,
        "name": "GAMBAS FRITAS CON TOMATE",
        "category": "Gambas",
        "description": "9 gambas , tomate",
        "details": ""
      },
      {
        "id": 51,
        "name": "GAMBAS FRITAS CON SALSA AGRIDULCE",
        "category": "Gambas",
        "description": "9 gambas rebozadas , cebolla , pimiento verde , piña",
        "details": "verdura laminada"
      },
      {
        "id": 52,
        "name": "GAMBAS SALTEADAS CON CHAMPIÑONES",
        "category": "Gambas",
        "description": "9 gambas , champiñones , mazorca",
        "details": ""
      },
      {
        "id": 53,
        "name": "CERDO CON AJO Y VERDURA",
        "category": "Cerdo",
        "description": "cerdo fino , ajo , col , cebolla , pimiento , bambú",
        "details": "verdura laminada"
      },
      {
        "id": 54,
        "name": "CERDO AGRIDULCE",
        "category": "Cerdo",
        "description": "cerdo rebozado , pimiento verde , zanahoria , cebolla , piña ( antes de rebozar , colocar 3 huevos al cerdo )",
        "details": "verdura laminada"
      },
      {
        "id": 55,
        "name": "COSTILLA FRITA AL ESTILO CANTONÉS",
        "category": "Costilla",
        "description": "",
        "details": ""
      },
      {
        "id": 56,
        "name": "CARNE CON BROTES DE SOJA",
        "category": "Carne",
        "description": "ternera , brotes de soja",
        "details": "fino"
      },
      {
        "id": 57,
        "name": "TERNERA CON SETAS Y BAMBÚ",
        "category": "Ternera",
        "description": "ternera , setas , bambú",
        "details": "laminado"
      },
      {
        "id": 58,
        "name": "PICADILLO DE CARNE CON FIDEO CHINO",
        "category": "Ternera",
        "description": "ternera , fideo chino , apio , cebolla , zanahoria , calabacín , bambú",
        "details": "fino"
      },
      {
        "id": 59,
        "name": "TERNERA CON SALSA DE OSTRAS",
        "category": "Ternera",
        "description": "ternera , champiñón , cebolla",
        "details": "laminado"
      },
      {
        "id": 60,
        "name": "TERNERA CON CEBOLLA",
        "category": "Ternera",
        "description": "ternera , cebolla",
        "details": "fino"
      },
      {
        "id": 61,
        "name": "TERNERA CON PIMIENTO VERDE",
        "category": "Ternera",
        "description": "ternera , pimiento verde",
        "details": "fino"
      },
      {
        "id": 62,
        "name": "TERNERA CON SALSA DE BARBACOA",
        "category": "Ternera",
        "description": "ternera , puerro , bambú",
        "details": "laminado"
      },
      {
        "id": 63,
        "name": "TERNERA CON SALSA CURRY",
        "category": "Ternera",
        "description": "ternera , cebolla , calabacín , zanahoria",
        "details": "laminado"
      },
      {
        "id": 64,
        "name": "TERNERA CON SALSA PICANTE",
        "category": "Ternera",
        "description": "ternera , pimiento verde , cebolla , consomé de carne , picante",
        "details": "laminado"
      },
      {
        "id": 65,
        "name": "POLLO AL SÉSAMO",
        "category": "Pollo",
        "description": "",
        "details": ""
      },
      {
        "id": 66,
        "name": "ALAS DE POLLO FRITAS CON SALSA",
        "category": "Pollo",
        "description": "",
        "details": ""
      },
      {
        "id": 67,
        "name": "POLLO AGRIDULCE",
        "category": "Pollo",
        "description": "pollo rebozado , cebolla , piña",
        "details": "laminado"
      },
      {
        "id": 68,
        "name": "POLLO CON SETAS Y BAMBÚ",
        "category": "Pollo",
        "description": "pollo , setas , bambú",
        "details": "laminado"
      },
      {
        "id": 69,
        "name": "POLLO CON SALSA DE LIMÓN",
        "category": "Pollo",
        "description": "",
        "details": ""
      },
      {
        "id": 70,
        "name": "POLLO CON PIMIENTO VERDE",
        "category": "Pollo",
        "description": "pollo , pimiento verde",
        "details": "laminado"
      },
      {
        "id": 71,
        "name": "POLLO CON ALMENDRAS",
        "category": "Pollo",
        "description": "pollo , calabacín , cebolla , zanahoria mazorca de maíz",
        "details": "dado"
      },
      {
        "id": 72,
        "name": "POLLO CON SALSA CURRY",
        "category": "Pollo",
        "description": "pollo , cebolla , calabacin",
        "details": "laminado"
      },
      {
        "id": 73,
        "name": "PATO CON SALSA DE ALMENDRAS",
        "category": "Pato",
        "description": "pato , almendras trituradas",
        "details": ""
      },
      {
        "id": 74,
        "name": "PATO CON SETAS Y BAMBÚ",
        "category": "Pato",
        "description": "pato , setas , bambú",
        "details": ""
      },
      {
        "id": 75,
        "name": "PATO A LA NARANJA",
        "category": "Pato",
        "description": "",
        "details": ""
      },
      {
        "id": 76,
        "name": "DIN SUM",
        "category": "Otros",
        "description": "",
        "details": ""
      },
      {
        "id": 77,
        "name": "DIN SUM DE GAMBAS",
        "category": "Otros",
        "description": "",
        "details": ""
      },
      {
        "id": 101,
        "name": "BERENJENAS CON SALSA",
        "category": "Berenjenas",
        "description": "berenjenas , cerdo , jengibre",
        "details": "laminado"
      },
      {
        "id": 102,
        "name": "TERNERA FRITA CON SALSA AGRIDULCE",
        "category": "Ternera",
        "description": "ternera , pimiento , zanahoria , piña",
        "details": "dado"
      },
      {
        "id": 103,
        "name": "COSTILLA FRITA EN PEDAZOS",
        "category": "Costilla",
        "description": "",
        "details": ""
      },
      {
        "id": 104,
        "name": "DOUFU CON CEBOLLINO",
        "category": "Doufu",
        "description": "doufu , cebollino",
        "details": ""
      },
      {
        "id": 105,
        "name": "POLLO GONGBAO",
        "category": "Pollo",
        "description": "pollo , pimiento verde , cebolla , jengibre , manices , salsa agridulce , picante",
        "details": "dado"
      },
      {
        "id": 106,
        "name": "POLLO CON JUDÍAS NEGRAS",
        "category": "Pollo",
        "description": "pollo , pasta de judias , pimiento verde , cebolla",
        "details": "dado"
      },
      {
        "id": 107,
        "name": "POLLO CON SALSA DE BARBACOA",
        "category": "Pollo",
        "description": "pollo dado , cebolla , puerro , bambú",
        "details": "verdura laminada"
      },
      {
        "id": 108,
        "name": "GAMBAS REBOZADAS",
        "category": "Gambas",
        "description": "10 gambas rebozadas",
        "details": ""
      },
      {
        "id": 109,
        "name": "GAMBAS CON SALSA DE BARBACOA",
        "category": "Gambas",
        "description": "9 gambas , cebolla , puerro , bambú , consomé de carne",
        "details": "verdura laminada"
      },
      {
        "id": 110,
        "name": "GAMBAS CON SALSA CURRY",
        "category": "Gambas",
        "description": "9 gambas , cebolla , calabacín , cebolla , zanahoria",
        "details": "verdura laminada"
      },
      {
        "id": 111,
        "name": "GAMBAS GONGBAO",
        "category": "Gambas",
        "description": "9 gambas , pimiento , cebolla , jengibre , manices",
        "details": "verdura laminada"
      },
      {
        "id": 112,
        "name": "ARROZ TOSTADO CON GAMBAS",
        "category": "Arroz",
        "description": "10 gambas , champiñones , arroz tostado aparte",
        "details": "dado"
      },
      {
        "id": 113,
        "name": "BOLAS DE PESCADO EN SALSA",
        "category": "Pescado",
        "description": "6 bolas de pescado , pimiento , cebolla Jengubre pequeño",
        "details": "picado"
      },
      {
        "id": 114,
        "name": "PATO CRUJIENTE",
        "category": "Pato",
        "description": "",
        "details": ""
      },
      {
        "id": 115,
        "name": "PATO CRUJIENTE AL ESTILO PEKÍN",
        "category": "Pato",
        "description": "",
        "details": ""
      },
      {
        "id": 116,
        "name": "PICADILLO DE PATO CON APIO",
        "category": "Pato",
        "description": "pato , apio Gengibre .",
        "details": ""
      },
      {
        "id": 117,
        "name": "HUEVO CON CEBOLLINO",
        "category": "Huevo",
        "description": "",
        "details": ""
      },
      {
        "id": 118,
        "name": "EMPANADILLAS CHINAS",
        "category": "Otros",
        "description": "",
        "details": ""
      },
      {
        "id": 119,
        "name": "ARROZ FRITO YANGZHOU",
        "category": "Arroz",
        "description": "arroz , pollo , ternera , 8 gambas , jamón , zanahoria pequeña , puerro",
        "details": "picado"
      },
      {
        "id": 120,
        "name": "FIDEO DE ARROZ CON TERNERA",
        "category": "Fideo de Arroz",
        "description": "ternera fina , fideo de arroz , frijoles",
        "details": ""
      }
    ];

    try {
      for (const dish of initialDishes) {
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

export { openDatabase, /**createTable,**/ insertDish, getDishes, deleteDish, insertInitialDishes };
