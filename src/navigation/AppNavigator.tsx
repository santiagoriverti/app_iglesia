import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import EvangelioScreen from '../screens/EvangelioScreen';
import MisasScreen from '../screens/MisasScreen';
import SantoScreen from '../screens/SantoScreen';
import EventosScreen from '../screens/EventosScreen';

const Tab = createBottomTabNavigator();

type IoniconName = keyof typeof Ionicons.glyphMap;

const tabIconos: Record<string, { activo: IoniconName; inactivo: IoniconName }> = {
  Inicio: { activo: 'home', inactivo: 'home-outline' },
  Evangelio: { activo: 'book', inactivo: 'book-outline' },
  Misas: { activo: 'people', inactivo: 'people-outline' },
  Santo: { activo: 'person', inactivo: 'person-outline' },
  Eventos: { activo: 'calendar', inactivo: 'calendar-outline' },
};

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconos = tabIconos[route.name];
          const nombre = focused ? iconos.activo : iconos.inactivo;
          return <Ionicons name={nombre} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: colors.primaryDark,
        },
        headerTitleStyle: {
          color: colors.white,
          fontWeight: '700',
          fontSize: 17,
        },
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Evangelio"
        component={EvangelioScreen}
        options={{ title: 'Evangelio del Día' }}
      />
      <Tab.Screen
        name="Misas"
        component={MisasScreen}
        options={{ title: 'Horarios de Misa' }}
      />
      <Tab.Screen
        name="Santo"
        component={SantoScreen}
        options={{ title: 'Santo del Día' }}
      />
      <Tab.Screen
        name="Eventos"
        component={EventosScreen}
        options={{ title: 'Eventos' }}
      />
    </Tab.Navigator>
  );
}
