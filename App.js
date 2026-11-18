import 'react-native-url-polyfill/auto';
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createClient } from '@supabase/supabase-js';

import InicioScreen from './src/screens/InicioScreen';
import CatalogoScreen from './src/screens/CatalogoScreen';
import PublicarScreen from './src/screens/PublicarScreen';

// Conexión directa a Supabase
const SUPABASE_URL = 'https://vzbzlcfwvphbzgyaezco.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5S3F77nsNM3JKQmUUobNvg_yGD1oc6q';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const Stack = createNativeStackNavigator();

export default function App() {
  const [productos, setProductos] = useState([]);

  // LEER (Read)
  const cargarProductos = async () => {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      Alert.alert('Error al cargar', error.message);
    } else {
      setProductos(data || []);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // CREAR (Create)
  const agregarProducto = async (nuevoProducto) => {
    const { data, error } = await supabase
      .from('productos')
      .insert([nuevoProducto])
      .select();

    if (error) {
      Alert.alert('Error al guardar', error.message);
    } else if (data && data.length > 0) {
      setProductos([data[0], ...productos]);
    }
  };

  // ACTUALIZAR (Update)
  const actualizarProducto = async (productoEditado) => {
    const { id, nombre, precio, categoria, emprendedor } = productoEditado;
    const { error } = await supabase
      .from('productos')
      .update({ nombre, precio, categoria, emprendedor })
      .eq('id', id);

    if (error) {
      Alert.alert('Error al actualizar', error.message);
    } else {
      setProductos(
        productos.map((item) => (item.id === id ? productoEditado : item))
      );
    }
  };

  // ELIMINAR (Delete)
  const eliminarProducto = async (id) => {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);

    if (error) {
      Alert.alert('Error al eliminar', error.message);
    } else {
      setProductos(productos.filter((item) => item.id !== id));
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={InicioScreen} options={{ title: 'YaviMarket' }} />
        <Stack.Screen name="Catalogo" options={{ title: 'Catálogo Estudiantil' }}>
          {(props) => (
            <CatalogoScreen
              {...props}
              productos={productos}
              eliminarProducto={eliminarProducto}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Publicar" options={{ title: 'Gestionar Producto' }}>
          {(props) => (
            <PublicarScreen
              {...props}
              agregarProducto={agregarProducto}
              actualizarProducto={actualizarProducto}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}