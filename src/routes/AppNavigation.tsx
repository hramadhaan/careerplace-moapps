import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../types/AppNavigation';
import OnboardingScreen from '../screens/OnboardingScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
};
