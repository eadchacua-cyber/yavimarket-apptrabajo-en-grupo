import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png' }}
        style={styles.logo}
      />
      <Text style={styles.titulo}>YaviMarket</Text>
      <Text style={styles.subtitulo}>
        Vitrina digital para emprendimientos de estudiantes del IST Yavirac.
      </Text>

      <TouchableOpacity
        style={styles.botonPrimario}
        onPress={() => navigation.navigate('Catalogo')}
      >
        <Text style={styles.textoBoton}>Ver Catálogo Disponible</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonSecundario}
        onPress={() => navigation.navigate('Publicar')}
      >
        <Text style={styles.textoBotonSecundario}>Publicar Nuevo Producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
  },
  botonPrimario: {
    backgroundColor: '#EA580C',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonSecundario: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EA580C',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  textoBotonSecundario: {
    color: '#EA580C',
    fontSize: 16,
    fontWeight: 'bold',
  },
});