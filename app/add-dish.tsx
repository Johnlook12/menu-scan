// components/AddDishForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { insertDish, openDatabase, getDishes } from '../lib/database';

const AddDishForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        category: '',
        description: '',
        details: ''
    });

    const handleSubmit = async () => {
        // Validación de campos obligatorios
        if (!formData.id || !formData.name || !formData.category) {
            Alert.alert('Error', 'ID, Nombre y Categoría son campos obligatorios');
            return;
        }

        // Validar que el ID sea numérico
        const idNumber = parseInt(formData.id);
        if (isNaN(idNumber)) {
            Alert.alert('Error', 'El ID debe ser un número válido');
            return;
        }

        try {
            const db = await openDatabase();

            // Verificar si el ID ya existe
            const existingDishes = await new Promise<any[]>((resolve) => {
                getDishes(db, (dishes) => resolve(dishes));
            });

            if (existingDishes.some(dish => dish.id === idNumber)) {
                Alert.alert('Error', 'Este ID ya está en uso');
                return;
            }

            // Insertar el nuevo plato
            await insertDish(db, {
                id: idNumber,
                name: formData.name,
                category: formData.category,
                description: formData.description,
                details: formData.details
            });

            Alert.alert('Éxito', 'Plato añadido correctamente', [
                {
                    text: 'OK', onPress: () => {
                        router.back()
                        router.replace('./');
                    }
                }
            ]);
        } catch (error) {
            console.error('Error adding dish:', error);
            Alert.alert('Error', 'No se pudo añadir el plato');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nuevo Plato</Text>

            <TextInput
                style={styles.input}
                placeholder="Número de plato *"
                placeholderTextColor={'#bdc3c7'}
                keyboardType="numeric"
                value={formData.id}
                onChangeText={(text) => setFormData({ ...formData, id: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Nombre del plato *"
                placeholderTextColor={'#bdc3c7'}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Categoría *"
                placeholderTextColor={'#bdc3c7'}
                value={formData.category}
                onChangeText={(text) => setFormData({ ...formData, category: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Descripción"
                placeholderTextColor={'#bdc3c7'}
                multiline
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Detalles"
                placeholderTextColor={'#bdc3c7'}
                multiline
                value={formData.details}
                onChangeText={(text) => setFormData({ ...formData, details: text })}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Guardar Plato</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2c3e50'
    },
    input: {
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 5,
        padding: 15,
        marginBottom: 15,
        fontSize: 16
    },
    button: {
        backgroundColor: '#2ecc71',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default AddDishForm;