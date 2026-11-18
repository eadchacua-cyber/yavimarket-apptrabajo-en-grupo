import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from './src/screens/InicioScreen';
import CatalogoScreen from './src/screens/CatalogoScreen';
import PublicarScreen from './src/screens/PublicarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={InicioScreen} options={{ title: 'YaviMarket' }} />
        <Stack.Screen name="Catalogo" component={CatalogoScreen} options={{ title: 'Catálogo' }} />
        <Stack.Screen name="Publicar" component={PublicarScreen} options={{ title: 'Publicar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
