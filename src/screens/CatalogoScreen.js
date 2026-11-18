import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

export default function CatalogoScreen({ navigation, productos, eliminarProducto }) {
  const [busqueda, setBusqueda] = useState('');

  // LEER / FILTRAR (Read)
  const productosFiltrados = productos.filter(
    (item) =>
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  const confirmarEliminacion = (id, nombre) => {
    Alert.alert(
      'Eliminar producto',
      `¿Seguro que deseas eliminar "${nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarProducto(id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar por nombre o categoría..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <TouchableOpacity
        style={styles.botonNuevo}
        onPress={() => navigation.navigate('Publicar')}
      >
        <Text style={styles.textoBoton}>+ Publicar Nuevo Producto</Text>
      </TouchableOpacity>

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.nombre}</Text>
            <Text style={styles.precio}>${item.precio}</Text>
            <Text style={styles.detalle}>Categoría: {item.categoria}</Text>
            <Text style={styles.detalle}>Vendedor: {item.emprendedor}</Text>

            <View style={styles.filaBotones}>
              <TouchableOpacity
                style={styles.botonEditar}
                onPress={() => navigation.navigate('Publicar', { productoEditar: item })}
              >
                <Text style={styles.textoBotonPequeno}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botonEliminar}
                onPress={() => confirmarEliminacion(item.id, item.nombre)}
              >
                <Text style={styles.textoBotonPequeno}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F3F4F6' },
  buscador: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 12,
  },
  botonNuevo: {
    backgroundColor: '#1E3A8A',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 14,
  },
  textoBoton: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  precio: { fontSize: 16, fontWeight: 'bold', color: '#059669', marginVertical: 4 },
  detalle: { fontSize: 14, color: '#4B5563' },
  filaBotones: { flexDirection: 'row', marginTop: 12, gap: 10 },
  botonEditar: {
    backgroundColor: '#F59E0B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  botonEliminar: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  textoBotonPequeno: { color: '#FFF', fontWeight: 'bold' },
});