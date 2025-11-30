import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 

import PreLogin from './screens/PreLogin';
import Login from './screens/Login';
import Register from './screens/Register';
import HomeLogado from './screens/HomeLogado';
import Profile from './screens/Profile';
import CursoIA from './screens/Curso-IA';
import { CourseProvider } from './context/CourseContext'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarActiveTintColor: '#000', 
        tabBarInactiveTintColor: 'gray', 
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeLogado} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CourseProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="PreLogin"
              screenOptions={{ headerShown: false }}>
              <Stack.Screen name="PreLogin" component={PreLogin} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="HomeTabs" component={AppTabs} />
              <Stack.Screen name="CursoIA" component={CursoIA} />
            </Stack.Navigator>
          </NavigationContainer>
        </CourseProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}