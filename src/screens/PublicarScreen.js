import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function PublicarScreen({ navigation }) {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [vendedor, setVendedor] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const validarYGuardar = () => {
    if (!nombreProducto.trim() || !precio.trim() || !vendedor.trim()) {
      setMensajeError('Todos los campos son obligatorios.');
      return;
    }
    setMensajeError('');
    Alert.alert(
      'Producto registrado',
      `"${nombreProducto}" ($${precio}) listo para revisión en el MVP.`,
      [{ text: 'Volver al Inicio', onPress: () => navigation.navigate('Inicio') }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registrar Emprendimiento</Text>

      <Text style={styles.label}>Nombre del producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Empanadas de viento"
        value={nombreProducto}
        onChangeText={setNombreProducto}
      />

      <Text style={styles.label}>Precio ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 1.25"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <Text style={styles.label}>Nombre del estudiante y curso</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Juan Pérez (3ro Software)"
        value={vendedor}
        onChangeText={setVendedor}
      />

      {mensajeError ? <Text style={styles.error}>{mensajeError}</Text> : null}

      <TouchableOpacity style={styles.boton} onPress={validarYGuardar}>
        <Text style={styles.textoBoton}>Guardar Producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    fontSize: 15,
  },
  error: {
    color: '#DC2626',
    marginBottom: 12,
    fontWeight: '600',
  },
  boton: {
    backgroundColor: '#1E293B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});