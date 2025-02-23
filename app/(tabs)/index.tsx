import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import HomeScreen from '@/screens/HomeScreen';
import LoginScreen from '@/screens/LoginSreen';
import FavoritesScreen from '@/screens/FavoritesScreen';
import RegisterScreen from '@/screens/RegisterScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Favorites: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </ApplicationProvider>
  );
};

export default App;