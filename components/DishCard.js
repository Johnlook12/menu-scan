import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DishCard = ({ dish }) => {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <View style={styles.number}>
          <Text style={styles.title}>{dish.id}</Text>
        </View>
        <View>
          <Text style={styles.title}>{dish.name}</Text>
          <Text style={styles.category}>{dish.category}</Text>
          <Text style={styles.details}>{dish.details}</Text>
          <Text style={styles.description}>{dish.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  category: {
    color: '#666',
    marginBottom: 5
  },
  description: {
    color: '#888',
    marginTop: 10,
    marginBottom: 3,
    fontSize: 18
  },
  details: {
    color: '#730515',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 3,
    fontSize: 18
  },
  number:{
    marginRight: 10,
  }
});

export default DishCard;