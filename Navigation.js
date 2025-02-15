import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, createStackNavigator } from '@react-navigation/native-stack';
import Home from "./Home.js";
import ViewDetails from './ViewDetails.js';

const Stack = createNativeStackNavigator();
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ViewDetails" component={ViewDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation;
