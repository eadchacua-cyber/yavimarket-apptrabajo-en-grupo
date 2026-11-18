import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

export default function PublicarScreen({ navigation, route, agregarProducto, actualizarProducto }) {
  const productoEditar = route.params?.productoEditar;

  const [nombre, setNombre] = useState(productoEditar ? productoEditar.nombre : '');
  const [precio, setPrecio] = useState(productoEditar ? productoEditar.precio : '');
  const [categoria, setCategoria] = useState(productoEditar ? productoEditar.categoria : '');
  const [emprendedor, setEmprendedor] = useState(productoEditar ? productoEditar.emprendedor : '');

  const guardarCambios = () => {
    if (!nombre.trim() || !precio.trim() || !categoria.trim() || !emprendedor.trim()) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los datos del producto.');
      return;
    }

    if (productoEditar) {
      actualizarProducto({
        id: productoEditar.id,
        nombre,
        precio,
        categoria,
        emprendedor,
      });
    } else {
      agregarProducto({
        nombre,
        precio,
        categoria,
        emprendedor,
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.encabezado}>
        {productoEditar ? 'Editar Producto' : 'Publicar Nuevo Producto'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del producto o servicio"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio (ej. 2.50)"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoría (Comida, Tutorías, Diseño...)"
        value={categoria}
        onChangeText={setCategoria}
      />
      <TextInput
        style={styles.input}
        placeholder="Tu nombre y carrera (ej. Eduardo - Software)"
        value={emprendedor}
        onChangeText={setEmprendedor}
      />

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarCambios}>
        <Text style={styles.textoBoton}>
          {productoEditar ? 'Guardar Cambios' : 'Publicar en Catálogo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F3F4F6' },
  encabezado: { fontSize: 22, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 20 },
  input: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 14,
  },
  botonGuardar: {
    backgroundColor: '#059669',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});