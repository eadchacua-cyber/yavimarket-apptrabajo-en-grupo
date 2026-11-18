import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import { PRODUCTOS_INICIALES } from '../data/productosLocales';

export default function CatalogoScreen() {
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = PRODUCTOS_INICIALES.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.encabezado}>Productos en Campus</Text>

      <TextInput
        style={styles.inputBuscador}
        placeholder="Buscar por nombre (ej. Sánduche, Jugo)..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <Image source={{ uri: item.imagen }} style={styles.imagenProducto} />
            <View style={styles.info}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.vendedor}>{item.vendedor}</Text>
              <Text style={styles.precio}>{item.precio}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    padding: 16,
  },
  encabezado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  inputBuscador: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 15,
  },
  tarjeta: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  imagenProducto: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  vendedor: {
    fontSize: 13,
    color: '#64748B',
    marginVertical: 3,
  },
  precio: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#EA580C',
  },
});